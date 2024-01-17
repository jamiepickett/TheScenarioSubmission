import Moment from 'moment';
Moment.updateLocale("en", {
    invalidDate: "invalid date"
});

interface Todo {
    _id: string;
    data: string;
    created: string;
    updatedAt: string;
}

interface ToDoListProps {
    data: Todo[]; // Replace YourDataType with the actual type of your data
    deleteFunc: (id: string, targetElm: HTMLElement) => void; // Replace number with the actual type of your ID
    updateFunc: (id: string, updatedText: string, targetElm: HTMLElement ) => void; // Replace number with the actual type of your ID
}

const ToDoList: React.FC<ToDoListProps> = ({ data, deleteFunc, updateFunc }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        let trigger = (e.target as Element).closest("a");
        if (trigger) {
            let target = (e.target as Element).closest("li");
            if(target){
                let myUUID = target.dataset.uuid;
                switch (trigger.dataset.trigger_type) {
                    case "delete":
                        let deleteConfirm = window.confirm("Are you sure you want to delete todo with UUID: " + myUUID);
                        if (deleteConfirm === true) {
                            if (myUUID !== undefined) {
                                deleteFunc(myUUID, target);
                            }
                        }
                        break;
                    case "edit":
                        let editConfirm = prompt("Change your ToDo:");
                        if (editConfirm != null) {
                            if (myUUID !== undefined) {
                                updateFunc(myUUID, editConfirm, target);
                            }
                        }
                        break;
                }
            }
        }
    }

    return (
        <ul onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => handleClick(e)} className="">

            {data.length ? (
                data.map((todo, index) => (

                    <li key={index} data-uuid={todo._id} className='relative flex gap-x-4'>
                        <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                            <div className="w-px bg-gray-200"></div>
                        </div>
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                        </div>
                        <div className="flex-auto pb-6 ">
                            <div className="flex justify-between gap-x-4">
                                <div className="py-0.5 text-sm leading-5 text-gray-700">
                                    <span className="font-medium text-gray-900">
                                        {todo.updatedAt != todo.created ? (
                                            "ToDo Updated "
                                        ) : (
                                            "ToDo Created "
                                        )
                                        }
                                    </span></div>
                                <time className="flex-none py-0.5 text-xs text-gray-500">{Moment(todo.updatedAt).format('MMM Do YYYY hh:mm')}</time>
                            </div>
                            <p className="text-base text-gray-500 mb-2">{todo.data}</p>

                            <div className='flex gap-3'>
                                <a href="#" className="text-sm underline" data-trigger_type="edit">Edit</a>
                                <a href="#" className="text-sm underline" data-trigger_type="delete">Delete</a>
                            </div>
                        </div>

                    </li>
                ))
            ) : (
                <li>Your ToDo list is empty.  Please add your first item.</li>
            )}
        </ul >
    )
}

export default ToDoList;