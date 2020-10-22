import React from 'react';
import preloader from './preloader.svg';
import styles from './Preloader.module.css';


export const Preloader = () => {
	return (
		<section className={styles.preloader}>
			<img src={preloader} alt='loading' />
		</section>
	)
}