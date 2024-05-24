import { useCallback, useRef } from "react";


const TodoModal = (props:any) => {
  const titleRef = useRef<any>('');
  const dateRef = useRef<any>('');
  const descriptionRef = useRef<any>(null);

  const formSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;
    const todo = { title, date, description };
    console.log(todo);
    props.onSubmitHandler(todo);
    const closeButton = document.getElementById('close') as HTMLButtonElement;
    closeButton.click();
  },[])

  return (
    <div className="modal fade" id="new-task" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add New Task</h5>
          </div>

          <form onSubmit={formSubmitHandler}>
            <div className="modal-body">
              <label htmlFor="Title" className="form-label">Task Title</label>
              <input type="text" ref={titleRef} name="Title" id="Title" className="form-control" required />
              <label htmlFor="Date" className="form-label mt-2">Due Date</label>
              <input type="date" ref={dateRef} name="Date" id="Date" className="form-control" required />
              <label htmlFor="Info" className="form-label mt-2">Description</label>
              <textarea ref={descriptionRef} name="Info" id="Info" cols={30} rows={5} className="form-control"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" id="close" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" id="save">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
