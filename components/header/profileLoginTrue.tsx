import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useQuery} from 'react-query';
import {AisAlarmBoxOn, AisProfileBoxOn} from '@/utils/recoil/recoilStore';
import ProfileBox from './profile/profileBox';
import AlarmBox from './alarm/alarmBox';
import styles from '@/styles/components/header/profileLoginTrue.module.scss';

function ProfileLoginTrue() {
	const accessToken = window.localStorage.getItem('accessToken');
	const [isProfileBoxOn, setIsProfileBoxOn] = useRecoilState(AisProfileBoxOn);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const [userInfo, setUserInfo] = useState<Userinfo>({
		id: 0,
		profile: 'string',
		name: 'string',
		location: 'string',
		activity: {
			document: 0,
			comment: 0,
			sanction: 0,
		},
	});
	const [alarmData, setAlarmData] = useState<(Alarmdata | Alarmdataname)[]>([
		{
			id: 2,
			type: 'announcement',
			refid: 3,
			date: '2023. 5. 1',
			contents: '개인정보 처리 방침이 변경되었습니다.',
			checked: false,
			del: false,
		},
		{
			id: 13,
			type: 'documentHot',
			refid: 4,
			date: '2023. 5. 2',
			contents: '',
			checked: true,
			del: false,
		},
		{
			id: 15,
			type: 'comment',
			refid: 5,
			name: '성익현',
			date: '2023. 5. 1',
			contents: '그건 좀;',
			checked: true,
			del: false,
		},
		{
			id: 17,
			type: 'recomment',
			refid: 6,
			name: '성익현',
			date: '2023. 5. 4',
			contents: '어쩌라고',
			checked: false,
			del: false,
		},
		{
			id: 7,
			type: 'note',
			refid: 8,
			name: '민지',
			contents: '왜 연락을 안받니',
			date: '2022.10.11',
			checked: false,
			del: false,
		},

		{
			id: 4,
			type: 'chat',
			refid: 9,
			name: '홍길동',
			contents: '혹시 댕댕이 예방접종 받았나요...?',
			date: '2023. 5. 1',
			checked: true,
			del: false,
		},
	]);

	useEffect(() => {
		async function fetchMyInfo() {
			await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/0`, {
				method: 'GET',
				headers: {
					Authorization: `${accessToken}`,
				},
			})
				.then(response => response.json())
				.then(data => {
					setUserInfo(data);
				});
		}

		const myInfo = fetchMyInfo();
		console.log(myInfo);
	}, []);

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
					src={'/icon/alarm.svg'}
					width={25}
					height={25}
					alt="alarm icon"
				/>
				<div style={{pointerEvents: 'none'}} className={styles.alarmD}></div>
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
					src={`${userInfo.data ? userInfo.data.profile : '/icon/person.svg'}`}
					width={40}
					height={40}
					alt="profile icon"
				/>
			</div>
			{isProfileBoxOn ? <ProfileBox /> : null}

			{isAlarmBoxOn ? (
				<AlarmBox alarmData={alarmData} setAlarmData={setAlarmData} />
			) : null}
		</div>
	);
}

export default ProfileLoginTrue;
