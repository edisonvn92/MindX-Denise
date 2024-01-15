import { CourseEntity } from '@/domains/course/entities';
import demo1 from '@/assets/images/demo-img-1.png';
import demo2 from '@/assets/images/demo-img-2.png';

export const dataFake: CourseEntity[] = [
  {
    code: 'ABCD01',
    name: 'Lập trình Scratch',
    id: '1',
    thumbnail: demo1,
    isActive: true,
    lessons: [
      {
        id: '1',
        displayOrder: 1,
        isActive: true,
        name: 'Bài học đầu tiên',
        learnTime: 6,
      },
      {
        id: '2',
        displayOrder: 2,
        isActive: true,
        name: 'Bài học thứ 2',
        learnTime: 8,
      },
    ],
  },
  {
    code: 'ABCD01',
    name: 'Năm 2: Lập trình Game',
    id: '2',
    thumbnail: demo2,
  },
  {
    code: 'ABCD01',
    name: 'Năm 1: Lập trình Scratch',
    id: '3',
    thumbnail: demo1,
  },
  {
    code: 'ABCD01',
    name: 'Năm 2: Lập trình Game',
    id: '4',
    thumbnail: demo2,
  },
  {
    code: 'ABCD01',
    name: 'Năm 2: Lập trình Game',
    id: '5',
    thumbnail: demo2,
  },
];
