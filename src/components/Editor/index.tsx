import React, { useEffect, useRef, useState } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';
import { ControllerRenderProps } from 'react-hook-form';
import { contentMaxLength } from '@/domains/lesson/entities';

const LazyLoadedQuill = React.lazy(() => import('react-quill'));

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', { color: [] }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'color',
];

type EditorProps = {
  placeholder: string;
  field: ControllerRenderProps<any, string>;
  onChange(value: string): void;
  maxLength?: contentMaxLength;
};

type QuillRef = {
  getEditor(): typeof Quill | null;
};

const TextEditor = React.forwardRef<QuillRef, EditorProps>((props, ref) => {
  const { placeholder, field, onChange, maxLength } = props;

  const [limitCharacter, setLimitCharacter] = useState<number>(maxLength as number);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (field.name.includes('quizParam.quizContent')) {
      setLimitCharacter(() => maxLength as number);
    } else {
      setLimitCharacter(() => maxLength as number);
    }
  }, []);

  const handleChange = (content: string) => {
    const editor = quillRef.current?.getEditor();
    editor?.on('text-change', () => {
      if (editor.getLength() >= limitCharacter) {
        editor.deleteText(limitCharacter, editor.getLength());
      }
    });

    onChange(content);
  };

  return (
    <React.Suspense fallback={false}>
      <LazyLoadedQuill
        ref={quillRef}
        value={field.value}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        onChange={handleChange}
        preserveWhitespace
      />
    </React.Suspense>
  );
});

export default TextEditor;
