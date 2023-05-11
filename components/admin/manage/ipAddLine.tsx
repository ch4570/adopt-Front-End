import styles from '@/styles/components/admin/manage/ipAddLine.module.scss';
import React from 'react';

function IpAddLine() {
	return (
		<div>
			<div className={styles.ipAddLine}>
				<div>
					<input type="text" />. <input type="text" />. <input type="text" />.{' '}
					<input type="text" />
				</div>
				<button className={styles.admit}>추가</button>
				<button>취소</button>
			</div>
			<hr></hr>
		</div>
	);
}

export default IpAddLine;
