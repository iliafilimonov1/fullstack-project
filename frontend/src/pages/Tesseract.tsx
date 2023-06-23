import { Spinner } from '@/components/ui/Spinner/Spinner';
import LoadFile from '@/components/ui/LoadFile/LoadFile';
import { extractStyles } from '@/services/utils';
import React, { useCallback, useMemo, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Languages } from '@/enums';

/** Язык по умолчанию */
const DEFAULT_LANGUAGE: keyof typeof Languages = 'eng';

/** Страница распознавания текста по картинке */
const Tesseracts: React.FC = ()   =>  {
  const [recognizedText, setRecognizedText] = useState<string>();
  /** Загруженное пользователем изображение */
  const [selectedImage, setSelectedImage] = useState<string[]>();
  /** Массив доступных языков */
  const [language, setLanguage] = useState<keyof typeof Languages>(DEFAULT_LANGUAGE);
  const [progress, setProgress] = useState<number>();

  /** Возможность демонстрации загрузки */
  const canShowProgress = progress && progress !== 100;

  /** Доступность кнопки очистки */
  const canShowClearButton = useMemo(
    () => !canShowProgress && (selectedImage || recognizedText),
    [],
  );

  /** Обработчик прогресса в процентах */
  const setProgressHandler = useCallback((progressNumber: number | undefined) => {
    if (progressNumber) { setProgress(progressNumber * 100); } else { setProgress(undefined); }
  }, [setProgress]);

  /** Функция для работы с tesseract */
  const recognize = useCallback(async (files: FileList) => {
    if (!files.length) {
      return;
    }
    /** Извлечение URL для парсера */
    const filesURL = Array.from(files)?.map((file) => URL.createObjectURL(file));
    setSelectedImage(filesURL);

    try {
      setProgressHandler(0.01);
      const worker = await createWorker({
        logger: (m: { progress: number }) => {
          setProgressHandler(m.progress);
        },
      });
      await worker.loadLanguage(language);
      await worker.initialize(language);
      const { data: { text } } = await worker.recognize(filesURL[0]);
      await worker.terminate();
      setRecognizedText(text);
    } catch (error) {
      console.warn(error);
    }
  }, [setRecognizedText]);

  /** Хэндлер очистки значений кроме выбора языка */
  const clearHandler = useCallback(() => {
    if (progress && progress !== 100) {
      return;
    }
    setSelectedImage(undefined);
    setRecognizedText(undefined);
    setProgressHandler(undefined);
  }, [setSelectedImage, setRecognizedText, setProgressHandler, progress]);

  /** При изменении языка сбрасываем все */
  const onSelectLanguageHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as keyof typeof Languages;
    setLanguage(value);
    clearHandler();
  }, [clearHandler, setLanguage]);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="font-bold text-3xl text-gray-600">Tesseract test</h1>
      <div className="flex flex-col self-start">
        <div className="flex bg-slate-200 p-2 rounded-md text-gray-500">
          <h2>Text language in the pictures:</h2>
          <select
            className="bg-transparent cursor-pointer"
            defaultValue={DEFAULT_LANGUAGE}
            onChange={onSelectLanguageHandler}
          >
            {Object.entries(Languages).map(([key, value]) => (
              <option
                key={key}
                value={key}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-4 justify-between w-full flex-col md:flex-row">
        <LoadFile
          callBack={recognize}
          previewFileUrl={selectedImage}
        />
        <div
          className="
            bg-white w-full p-4 border-[1px] rounded-md
            flex flex-col justify-center items-center text-gray-500
          "
        >
          <div className="text-center font-bold mb-2">Result</div>
          {canShowProgress && <div>{`${progress.toFixed()}%`}</div>}
          {!canShowProgress && recognizedText}
          {canShowProgress && <Spinner />}
        </div>
      </div>
      <button
        className={
          extractStyles`{
            px-10 py-2 rounded-md text-gray-500 self-end
            ${canShowClearButton ? 'bg-gray-200' : 'bg-gray-100'}
          }`
        }
        onClick={() => clearHandler()}
        type="button"
      >
        Clear
      </button>
    </div>
  );
};

export default React.memo(Tesseracts);
