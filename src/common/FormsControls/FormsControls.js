import React from 'react'
import styles from './FormsControls.module.scss'


const FormsControls = ({ input, meta, children, required, ...props }) => {
	const hasError = !required
		? input.value.length > 0 && meta.error
		: (meta.touched && meta.error) || (input.value.length > 0 && meta.error)

	return (
		<>
			{children}
			<span error={hasError ? hasError : undefined} className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
				{hasError && <span className={styles.textError}>{meta.error}</span>}
			</span>
		</>
	)
}


export const Component = {
	textarea: ({ ...props }) => (
		<FormsControls {...props}>
			<textarea className={styles.text} {...props.input} {...props} />
		</FormsControls>
	),

	input: ({ ...props }) => (
		<FormsControls required='true' {...props}>
			<input className={styles.text} {...props.input} {...props} />
		</FormsControls>
	)
}


// export const createField = (placeholder, name, validators, component, props={}, text=``) => (
//   <p>
//     <Field 
//       placeholder={placeholder}
//       name={name}
//       validate={validators}
//       component={Component[component]}
//       {...props}
//     />{text}
//   </p>
// )