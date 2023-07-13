import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import React, { useState, useCallback, createRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useToggle } from 'usehooks-ts';

const ReactAvatarEdit: React.FC = () => {
  const ref = createRef<AvatarEditor>();
  const [showModal, toggleShowModal] = useToggle();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [radius, setRadius] = useState(0);
  const [file, setFile] = useState<File>();

  const saveHandler = useCallback(() => {
    if (ref.current) {
      const canvas = ref.current.getImage();

      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const result = new Blob([blob], { type: 'image/jpeg' });
            /** Здесь нужен вызов callback */
            return result;
          }
        }, 'image/jpeg');
      }
    }
    return undefined;
  }, []);

  return (
    <div>
      <Button onClick={toggleShowModal}>Открыть модалку</Button>
      {showModal && (
        <Modal onClose={toggleShowModal}>
          {!file && (
            <>
              <div>Выберите картинку</div>
              <input
                onChange={(e) => setFile(e.target.files?.[0])}
                type="file"
              />
            </>
          )}
          {file && (
            <>
              <AvatarEditor
                ref={ref}
                border={50}
                borderRadius={radius}
                color={[255, 255, 255, 0.6]}
                height={250}
                image={URL.createObjectURL(file)}
                rotate={rotate}
                scale={scale}
                width={250}
              />
              <div className="flex flex-col my-2 gap-2">
                <div>Увеличить</div>
                <input
                  max={3}
                  min={1}
                  onChange={(e) => setScale(+e.target.value)}
                  step={0.1}
                  type="range"
                  value={scale}
                />
                <div>Повернуть</div>
                <input
                  max={360}
                  min={0}
                  onChange={(e) => setRotate(+e.target.value)}
                  step={0.1}
                  type="range"
                  value={rotate}
                />
                <div>Округление</div>
                <input
                  max={150}
                  min={0}
                  onChange={(e) => setRadius(+e.target.value)}
                  step={0.1}
                  type="range"
                  value={radius}
                />
              </div>
              <Button onClick={saveHandler}>
                Сохранить
              </Button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ReactAvatarEdit;
