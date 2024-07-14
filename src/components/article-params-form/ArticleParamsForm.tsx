import { FormEvent, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';


type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLElement>(null);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

	const [newFontColor, setNewFontColor] = useState(
		currentArticleState.fontColor
	);

	const [newFontSize, setNewFontSize] = useState(
		currentArticleState.fontSizeOption
	);

	const [newFontFamily, setNewFontFamily] = useState(
		currentArticleState.fontFamilyOption
	);

	const [newBackground, setNewBackground] = useState(
		currentArticleState.backgroundColor
	);

	const [newContentWidth, setNewContentWidth] = useState(
		currentArticleState.contentWidth
	);

	//открытие формы при нажатии на стрелку
	const formOpenHandler = () => {
		setIsOpenForm((prevIsOpen) => !prevIsOpen);
	};

	//хук закрытия формы при клике по оверлею
	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: formOpenHandler,
		onChange: setIsOpenForm,
	});

	const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontFamilyOption: newFontFamily,
			fontColor: newFontColor,
			backgroundColor: newBackground,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSize,
		});
	};

	const formResetHandler = () => {
		setCurrentArticleState({
			...defaultArticleState,
		});
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackground(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
		setNewFontSize(defaultArticleState.fontSizeOption);
	};

	return (
		<>
			<ArrowButton onClick={formOpenHandler} isOpen={isOpenForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form onSubmit={formSubmitHandler} className={styles.form}>
					<Text weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newFontFamily}
						title='цвет шрифта'
						onChange={setNewFontFamily}
					/>
					<RadioGroup
						name='123'
						title='размер шрифта'
						options={fontSizeOptions}
						onChange={setNewFontSize}
						selected={newFontSize}
					/>
					<Select
						options={fontColors}
						selected={newFontColor}
						title='цвет шрифта'
						onChange={setNewFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={newBackground}
						title='цвет фона'
						onChange={setNewBackground}
					/>
					<Select
						options={contentWidthArr}
						selected={newContentWidth}
						title='Ширина контента'
						onChange={setNewContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={formResetHandler} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};