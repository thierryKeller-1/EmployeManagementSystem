import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from './api/todosApi'
import { setTodos } from './todosSlice'

function TodosList() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)

  const { data, isLoading, isError, refetch } = useGetTodosQuery()

  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation()
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation()
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation()

  useEffect(() => {
    if (data) {
      dispatch(setTodos(data))
    }
  }, [data, dispatch])

  const handleAddTodo = async (todo) => {
    await addTodo(todo)
    refetch()
  }

  const handleUpdateTodo = async (id, todo) => {
    await updateTodo({ id, ...todo })
    refetch()
  }

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id)
    refetch()
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading todos</div>

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault()
        const todo = {
          title: e.target.title.value,
          completed: false
        }
        handleAddTodo(todo)
      }}>
        <input type="text" name="title" placeholder="Add Todo" />
        </form>
    </>
    );
}
