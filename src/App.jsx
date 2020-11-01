import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { ThemeProvider } from 'styled-components/macro'

import { lightTheme, darkTheme } from './component/theme'
import { GlobalStyle, Typography, Input, Button, Toggler } from './component'
import { initializeApp, addNewTask, deleteTask } from './slice/appSlice'
import { Preloader } from './common/Preloader/Preloader'

const App = ({ ...props }) => {
  const dispatch = useDispatch()
  const { initialized, taskList } = useSelector((state) => state.app)
  const [value, setValue] = useState(``)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    dispatch(initializeApp())
    setIsDarkTheme(JSON.parse(localStorage.getItem(`isDarkTheme`)) || false)
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem(`isDarkTheme`, JSON.stringify(isDarkTheme))
  }, [isDarkTheme])

  const Handle = {
    submit(evt) {
      evt.preventDefault()
      value.trim() && dispatch(addNewTask(value))
      setValue(``)
    },
    toggleTheme() {
      setIsDarkTheme((prev) => !prev)
    },
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      {!initialized ? (
        <Preloader />
      ) : (
        <main>
          <header>
            <Toggler onClick={Handle.toggleTheme}>
              <Typography className={`visually-hidden`}>
                {`включить ${isDarkTheme ? `светлую` : `темную`} тему`}
              </Typography>
            </Toggler>
          </header>
          <Typography as={NavLink} to={`/`} activeClassName={`active`}>
            <h1>hi</h1>
          </Typography>
          <form onSubmit={Handle.submit}>
            <Input
              value={value}
              onChange={(evt) => setValue(evt.target.value)}
              css={`
                background: yellow;
              `}
            />
            <Button>add</Button>
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
                <Route path={`/`} exact render={() => <Items />} />
                  <Route path={`/:taskId?`} render={() => <Item />} />
                </Switch> 
          */}
        </main>
      )}
    </ThemeProvider>
  )
}

export default compose(memo)(App)
