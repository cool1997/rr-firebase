import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import styled from 'styled-components'

import { initializeApp, addNewTask, deleteTask } from '../slice/appSlice'
import { Preloader } from '../common/Preloader/Preloader'

const Container = styled.div`
  padding: 40px 64px;

  min-width: 100vw;
  min-height: 100vh;

  background-color: #ffffff;

  color: #000000;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`

const App = ({ ...props }) => {
  const dispatch = useDispatch()
  const { initialized, taskList } = useSelector((state) => state.app)
  const [value, setValue] = useState(``)

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  const Handle = {
    submit(evt) {
      evt.preventDefault()
      value.trim() && dispatch(addNewTask(value))
      setValue(``)
    },
  }

  return !initialized ? (
    <Preloader />
  ) : (
    <Container>
      <main>
        <form onSubmit={Handle.submit}>
          <input
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
          ></input>
          <button>add</button>
        </form>
        <ul>
          {taskList.map((task) => (
            <li key={task.id}>
              <div>{task.title}</div>
              <span>{task.date}</span>
              <button onClick={() => dispatch(deleteTask(task.id))}>
                delete
              </button>
            </li>
          ))}
        </ul>
        {/* <Switch>
			<Route path={`/`} exact re/nder={() => <Items />} />
			<Route path={`/:taskId?`} render={() => <Item />} />
		</Switch> */}
      </main>
    </Container>
  )
}

export default compose(memo)(App)
