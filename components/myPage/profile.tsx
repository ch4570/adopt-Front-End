import styles from '@/styles/components/myPage/profile.module.scss';
import {useEffect, useRef, useState} from 'react';
function Profile() {
	const [isModify, setIsModify] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const inputImgRef = useRef<HTMLInputElement>(null);
	const [name, setName] = useState('John Doe');
	const [newName, setNewName] = useState('John Doe');

	const dummyImg =
		'https://mblogthumb-phinf.pstatic.net/MjAxNjExMjJfMjEx/MDAxNDc5NzQ0MDAzOTQy.-ax_EfCGWODogkXHIuDpovF5XHfaYi_s8EtRVWEjYXQg.R4kQWRtNC7pNxF03-aKWylWpGoRgE7vGDeagJm7Sgk0g.PNG.outdoor-interlaken/%EC%8A%A4%EC%9C%84%EC%8A%A4_%EC%97%AC%ED%96%89%ED%95%98%EA%B8%B0_%EC%A2%8B%EC%9D%80_%EA%B3%84%EC%A0%88_christofs70.png?type=w800';
	const [currentImg, setCurrentImg] = useState(dummyImg);

	useEffect(() => {
		setName(name);
	}, []);
	useEffect(() => {
		inputRef.current?.focus();
	}, [isModify]);
	return (
		<>
			<div className={styles.profileWrap}>
				<div className={styles.imgWrap}>
					<img
						className={styles.profileImg}
						src={currentImg}
						alt="프로필 이미지"
					/>
					<label htmlFor="profileInput" className={styles.hoverWrap}>
						<div className={styles.imageBtn}>수정</div>
					</label>

					<input
						ref={inputImgRef}
						onInput={e => {
							console.log(e.currentTarget.files);
							if (inputImgRef.current) {
								const file = inputImgRef?.current?.files![0];
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onloadend = () => {
									setCurrentImg(reader.result as string);
								};
							}
						}}
						id="profileInput"
						accept="image/*"
						className={styles.fileInput}
						type="file"
					/>
				</div>

				<div className={styles.profileInfo}>
					<h1
						onClick={() => {
							setIsModify(true);
						}}
					>
						{isModify ? (
							<input
								value={newName}
								ref={inputRef}
								type="text"
								onChange={e => {
									setNewName(e.target.value);
								}}
								onBlur={() => {
									setNewName(name);
									setIsModify(false);
								}}
								onKeyUp={e => {
									console.log(e.code);
									if (e.code === 'Enter') {
										setName(newName);
										setIsModify(false);
									} else if (e.code === 'Escape') {
										setNewName(name);
										setIsModify(false);
									}
								}}
							/>
						) : (
							`${name}`
						)}
					</h1>
					<p>경상남도 창원시</p>
					<p></p>
					<button className={styles.saveBtn}>저장</button>
				</div>
			</div>
			<div className={styles.buttonWrap}>
				<button>계정탈퇴</button>
			</div>
		</>
	);
}

export default Profile;