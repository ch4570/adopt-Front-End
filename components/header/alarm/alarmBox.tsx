import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {AisAlarmBoxOn} from '@/utils/recoil/recoilStore';
import CardListWrap from './cardListWrap';
import styles from '@/styles/components/header/alarm/alarmBox.module.scss';

function AlarmBox({
	alarmData,
	setAlarmData,
}: {
	alarmData: (Alarmdata | Alarmdataname)[];
	setAlarmData: React.Dispatch<
		React.SetStateAction<(Alarmdata | Alarmdataname)[]>
	>;
}) {
	const alarmBoxRef = useRef<HTMLDivElement>(null);
	const [isAlarmBoxOn, setIsAlarmBoxOn] = useRecoilState(AisAlarmBoxOn);
	const findHaveParent = (
		node: HTMLElement,
		target: HTMLElement,
	): boolean | HTMLElement => {
		if (node === target) {
			return true;
		} else {
			if (node === null) {
				return false;
			}
			return findHaveParent(node.parentElement as HTMLElement, target);
		}
	};
	const handleCloseAlarm = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (
			findHaveParent(
				e.target as HTMLElement,
				alarmBoxRef.current as HTMLElement,
			) ||
			(target.classList[0]?.includes('profileLoginTrue_imgWrap') &&
				target.classList[0] !== undefined)
		) {
		} else setIsAlarmBoxOn(false);
	};

	useEffect(() => {
		window.addEventListener<any>('click', handleCloseAlarm);

		return () => {
			window.removeEventListener<any>('click', handleCloseAlarm);
		};
	}, []);

	useEffect(() => {
		console.log(alarmData);
	}, [alarmData]);

	return (
		<div ref={alarmBoxRef} className={styles.box}>
			<div className={styles.boxHeader}>
				<div className={styles.backWrap}>
					<img
						className={styles.closeBtn}
						src="/icon/left.svg"
						onClick={() => {
							setIsAlarmBoxOn(false);
						}}
						width={36}
						height={36}
						alt=""
					/>
					<span>알람</span>
				</div>
				<div
					onClick={() => {
						let delay = 0;
						alarmData.map((data, i) => {
							delay += 70;
							if (data && data.checked) {
								setTimeout(() => {
									setAlarmData(prev => {
										let result = [...prev];
										result[i].del = true;

										return result;
									});
									if (i === alarmData.length - 1) {
										setTimeout(() => {
											setAlarmData(prev => prev.filter(datas => !datas.del));
										}, 100);
									}
								}, delay);
							}
						});
					}}
					className={styles.delRead}
				>
					읽은 알람 삭제
				</div>
			</div>
			<div className={styles.innerWrap}>
				<CardListWrap alarmData={alarmData} />
			</div>
		</div>
	);
}

export default AlarmBox;
