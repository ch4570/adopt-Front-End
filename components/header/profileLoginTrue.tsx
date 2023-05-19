import React, {useEffect, useRef, useState} from 'react';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';
import ProfileBox from './profileBox';
import AlarmBox from './alarmBox';

function ProfileLoginTrue() {
	const [isProfileBoxOn, setIsProfileBoxOn] = useState(false);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useState(false);
	return (
		<div className={styles.profileLoginWrap}>
			<div
				onClick={() => {
					setIsAlarmBoxOn(prev => !prev);
					setIsProfileBoxOn(false);
				}}
				className={styles.imgWrap}
			>
				<img
					style={{pointerEvents: 'none'}}
					className={styles.img}
					src="/icon/alarm.svg"
					width={30}
					height={30}
					alt="alarm icon"
				/>
				<div className={styles.alarmD}></div>
			</div>

			<div
				onClick={() => {
					setIsProfileBoxOn(prev => !prev);
					setIsAlarmBoxOn(false);
				}}
				className={styles.profile}
			>
				<img
					style={{pointerEvents: 'none'}}
					className={styles.img}
					src="/icon/person.svg"
					width={30}
					height={30}
					alt="profile icon"
				/>
			</div>
			{isProfileBoxOn ? (
				<ProfileBox setIsProfileBoxOn={setIsProfileBoxOn} />
			) : null}

			{isAlarmBoxOn ? <AlarmBox setIsAlarmBoxOn={setIsAlarmBoxOn} /> : null}
		</div>
	);
}

export default ProfileLoginTrue;