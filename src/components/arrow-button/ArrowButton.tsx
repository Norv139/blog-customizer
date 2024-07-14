import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';

import styles from './ArrowButton.module.scss';
import { SyntheticEvent } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type ArrowButtonProps = {
	onClick?: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	const arrowClickHandler = () => {
		onClick?.();
	};
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={(e: SyntheticEvent) => {
				e.stopPropagation();
				arrowClickHandler();
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
