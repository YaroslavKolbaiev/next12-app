import Image from 'next/image';
import React, {
  useContext,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import classes from './Account.module.css';
import { UserContext } from '../../UserContext/UserContext';
import handleFileChanged from '../../helpers/handleFileChange';
import handleCancelImageClick from '../../helpers/handleCancelImageClick';
import { FirebaseAuthService } from '../../helpers/FirebaseAuthService';

export default function Account() {
  const [isAvatarImageForm, setIsAvatarImageForm] = useState(false);
  const { user } = useContext(UserContext);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<any>();

  const setFileInputRef = (value: any) => {
    fileInputRef.current.value = value;
  };

  // const switchOffMsg = () => {
  //   setTimeout(() => {
  //     setIsPasswordChanged(false);
  //   }, 3000);
  // };

  async function avatarHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await FirebaseAuthService.updateUserProfile(imageUrl);
      setIsAvatarImageForm(false);
    } catch (error) {
      alert('Uploading avatar failed');
    }
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    handleFileChanged(event, setUploadProgress, setImageUrl, setFileInputRef);
  }

  function handleCancelImage() {
    handleCancelImageClick(
      imageUrl,
      setFileInputRef,
      setImageUrl,
      setUploadProgress,
    );
  }

  // if (isLoading) {
  //   return <LoadingComp />;
  // }

  return (
    <>
      <section className="hero is-dark is-bold">
        <div className="hero-body has-text-centered">
          <button
            type="button"
            className={classes.logoWrapper}
            onClick={() => {
              setIsAvatarImageForm(true);
            }}
          >
            {!user?.photoURL && (
              <span className={classes.logoText}>Click to change</span>
            )}
            <Image
              className={classes.logoImage}
              src={!user?.photoURL ? '/images/noAvatar.png' : user.photoURL}
              alt="An image showing person"
              width={200}
              height={200}
            />
          </button>
          <p className="title has-text-grey-light">
            {user?.email}
          </p>
        </div>
      </section>

      <div className={classNames('modal', { 'is-active': isAvatarImageForm })}>
        <div className="modal-background" />
        <div className="modal-content is-clipped">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="box">
                  <form
                    onSubmit={avatarHandler}
                  >
                    <div className="file is-dark mb-2">
                      <label htmlFor="file" className="file-label">
                        <input
                          id="file"
                          className="file-input"
                          type="file"
                          name="resume"
                          accept="image/*"
                          onChange={handleFile}
                          ref={fileInputRef}
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fa-solid fa-upload" />
                          </span>
                          <span className="file-label">Upload File</span>
                        </span>
                      </label>
                    </div>

                    {uploadProgress > -1 && (
                      <progress
                        className="progress"
                        value={uploadProgress}
                        max="100"
                      >
                        {uploadProgress}
                        %
                      </progress>
                    )}

                    {imageUrl && (
                      <div className="notification">
                        <button
                          aria-label="delete"
                          className="delete"
                          type="button"
                          onClick={handleCancelImage}
                        />
                        <figure className="image">
                          <Image
                            src={imageUrl}
                            alt="img"
                            height={200}
                            width={200}
                          />
                        </figure>
                      </div>
                    )}
                    <button type="submit" className="button is-small is-dark mt-2">
                      Change avatar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsAvatarImageForm(false)}
          type="button"
          className="modal-close"
          aria-label="close"
        />
      </div>
    </>
  );
}
