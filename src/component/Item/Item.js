import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { changeTask, deleteTask, setActiveTaskId } from '../../slice/tasks/tasksSlice'

import styles from './Item.module.scss'


const Item = ({ match, history, ...props }) => {
	const dispatch = useDispatch()

	const [isChangeValue, setIsChangeValue] = useState(false)
	const [initialTask, setInitialTask] = useState({ id: null, title: `` })
	const [activeTaskTitle, setActiveTaskTitle] = useState(``)


	const { tasks, activeTaskId } = useSelector(state => state.tasks)


	const id = match.params.taskId


	useEffect(() => {
		dispatch(setActiveTaskId(id))
		return () => dispatch(setActiveTaskId(null))
	}, [id, dispatch])

	useEffect(() => {
		tasks.forEach((item) => {
			if (item.id == activeTaskId) {
				setInitialTask({ id: item.id, title: item.title })
				setActiveTaskTitle(item.title)
			}
		})
	}, [activeTaskId])


	const Handle = {
		onSubmit: (evt) => {
			evt.preventDefault()
			if (isChangeValue) {
				dispatch(changeTask(id, activeTaskTitle))
			}
			history.push('/')
		},
		onChange: (evt) => {
			setActiveTaskTitle(evt.target.value)
			evt.target.value === initialTask.title
				? setIsChangeValue(false)
				: setIsChangeValue(true)
		},
		deleteTask: () => {
			dispatch(deleteTask(id))
			history.push('/')
		},
	}


	return (
		<form
			className={`${styles.Item}`}
			onSubmit={(evt) => Handle.onSubmit(evt)}>
			<h2 className={`${styles.title}`}>{`Задача №${id}`}</h2>

			<button
				className={`${styles.btnDelete}`}
				type={`button`}
				onClick={Handle.deleteTask}>
				удалить
        </button>
			<label
				className={`${styles.label}`}
				htmlFor={`newTask`}>Краткое описание</label>
			<input
				className={`${styles.field}`}
				id={`newTask`}
				onChange={(evt) => Handle.onChange(evt)}
				value={activeTaskTitle}
				type={`text`}
				autoComplete={`off`} />
			<button
				className={`${styles.btn} ${isChangeValue ? styles.btnSave : ``}`}>
				{
					isChangeValue
						? `Сохранить`
						: `Вернуться в список`
				}
			</button>
		</form>
	)
}


const Container = compose(
	withRouter,
	memo
)(Item)


export { Container as Item }