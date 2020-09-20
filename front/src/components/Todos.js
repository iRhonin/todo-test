import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import CheckIcon from '@material-ui/icons/Check'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import {
  listTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from '../api'

const TodoStatuses = {
  done: 'completed',
  undone: 'in-progress',
}

const Todos = () => {
  const [state, setState] = useState({
    columns: [
      { title: 'ID', field: 'id', hidden: true },
      { title: 'Title', field: 'title' },
      {
        title: 'Status',
        field: 'status',
        lookup: {
          [TodoStatuses.undone]: 'In Progress',
          [TodoStatuses.done]: 'Completed',
        },
      },
    ],
    data: [],
  })

  useEffect(() => {
    listTodosApi().then((res) => {
      const data = res.data
      setState((prevState) => {
        return { ...prevState, data }
      })
    })
  }, [])

  function createTodo(newTodo) {
    return createTodoApi(newTodo).then((res) => {
      setState((prevState) => {
        const newTodos = [res.data, ...prevState.data]
        return { ...prevState, data: newTodos }
      })
    })
  }

  function deleteTodo(todoId) {
    return deleteTodoApi(todoId).then((res) => {
      setState((prevState) => {
        const todoIndex = prevState.data.indexOf((todo) => todo.id === todoId)
        const newTodos = [...prevState.data]
        newTodos.splice(todoIndex)
        return { ...prevState, data: newTodos }
      })
    })
  }

  function updateTodo(id, args) {
    return updateTodoApi(id, args).then((res) => {
      setState((prevState) => {
        const todoIndex = prevState.data.findIndex((todo) => todo.id === id)
        const newTodos = [...prevState.data]
        newTodos[todoIndex] = { ...newTodos[todoIndex], ...res.data }
        return {
          ...prevState,
          data: newTodos,
        }
      })
    })
  }

  return (
    <MaterialTable
      title='Todos'
      columns={state.columns}
      data={state.data}
      options={{
        filtering: true,
      }}
      actions={[
        (todo) => ({
          icon: CheckIcon,
          tooltip: 'Mark as undone',
          onClick: (event, todo) => {
            updateTodo(todo.id, { status: TodoStatuses.undone })
          },
          hidden: todo.status === TodoStatuses.undone,
        }),
        (todo) => ({
          icon: CheckBoxOutlineBlankIcon,
          tooltip: 'Mark as done',
          onClick: (event, todo) => {
            updateTodo(todo.id, { status: TodoStatuses.done })
          },
          hidden: todo.status === TodoStatuses.done,
        }),
      ]}
      cellEditable={{
        onCellEditApproved: (newValue, oldValue, todo, columnDef) => {
          return new Promise((resolve, reject) => {
            updateTodo(todo.id, { [columnDef.field]: newValue }).then(resolve)
          })
        },
      }}
      editable={{
        onRowAdd: (newTodo) =>
          new Promise((resolve) => {
            createTodo(newTodo).then(resolve)
          }),
        onRowDelete: (todo) =>
          new Promise((resolve) => {
            deleteTodo(todo.id).then(resolve).catch(resolve)
          }),
      }}
    />
  )
}

export default Todos
