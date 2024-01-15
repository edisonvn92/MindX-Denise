import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { cloneDeep } from 'lodash';
import { useToast } from '@mx/ui';
import { CourseHttpRepository } from '../adapters/repositories';
import { CourseValidation } from '../validations';
import { useAppContext, useCoreContext } from '@/core';
import { CourseEntity } from '@/domains/course/entities';
import { CreateCourseUseCase } from '@/domains/course/usecases';
import { UpdateCourseUseCase } from '@/domains/course/usecases/update.usecase';

interface DetailProps {
  detail?: CourseEntity;
}

const courseForm = (props: DetailProps) => {
  const { detail } = props;
  const { t } = useAppContext();
  const { setIsEditCourseDialogOpened } = useCoreContext();
  const createCourse = new CreateCourseUseCase(new CourseHttpRepository());
  const updateCourse = new UpdateCourseUseCase(new CourseHttpRepository());
  const defaultValue = {
    id: detail?.id || '',
    code: detail?.code || '',
    name: detail?.name || '',
    thumbnail: detail?.thumbnail || '',
  };
  const toast = useToast();

  const methodForm = useForm({
    mode: 'onTouched',
    defaultValues: defaultValue,
    values: defaultValue,
    resolver: yupResolver(CourseValidation.courseValidationSchema()),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = methodForm.handleSubmit(async (data: any) => {
    try {
      if (!detail) {
        const sentData = cloneDeep(data);
        delete sentData.id;
        await createCourse.run(sentData);
        setIsEditCourseDialogOpened(false);
        toast.addToast({ status: 'success', header: t('course:createCourseSuccessfully') });
      } else {
        await updateCourse.run(data);
        setIsEditCourseDialogOpened(false);
        toast.addToast({ status: 'success', header: t('course:updateCourseSuccessfully') });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    methodForm,
    onSubmit,
    defaultValue,
  };
};

export default courseForm;
