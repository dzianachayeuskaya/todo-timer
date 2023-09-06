import { useState } from 'react';

import { ListTypeEnum } from '../enums/ListTypeEnum';
import { List } from './List';

import { TaskComponent } from './Task';
import { CompletedTaskComponent } from './CompletedTask';
import { generateRandomString } from '../utils/utils';
import { TaskModel } from '../models/TaskModel';
import data from '../data/testData.json';

function Main() {
    const [task, setTask] = useState(new TaskModel());
    const [list, setList] = useState(data.taskList);
    const [completedList, setCompletedList] = useState(data.completedTaskList);

    function handleChange(e) {
        const { value } = e.target;

        setTask({
            name: value,
            id: generateRandomString(),
            spentTime: '0',
            timeRangeArray: [{ startPointOb: 0, stopPointOb: 0 }],
        });
    }

    function handleClick(e) {
        e.preventDefault();
        setList((prevList) => [...prevList, task]);
        setTask(new TaskModel());
    }

    function handleClickClose(itemId, listType) {
        switch (listType) {
            case ListTypeEnum.Current:
                setList(() => list.filter((task) => task.id !== itemId));
                break;
            case ListTypeEnum.Completed: {
                setCompletedList(() =>
                    completedList.filter((task) => task.id !== itemId)
                );
                break;
            }
            default:
                break;
        }
    }

    function handleListClickFinish(item) {
        handleClickClose(item.id, ListTypeEnum.Current);
        setCompletedList((prevList) => [
            ...prevList,
            {
                name: item.name,
                id: item.id,
                spentTime: item.spentTime,
                timeRangeArray: item.timeRangeArray,
            },
        ]);
    }

    return (
        <main
            className='container'
            style={{ minHeight: 'calc(100vh + 73px + 56px)' }}>
            <form className='input-group mb-3 d-flex justify-content-between align-items-center'>
                <input
                    type='text'
                    className='form-control fs-3 rounded'
                    placeholder='Add new task to list...'
                    onChange={handleChange}
                    value={task.name}
                />
                <div className='input-group-append'>
                    <button
                        className='btn btn-outline-secondary fs-3'
                        type='submit'
                        onClick={handleClick}>
                        Add
                    </button>
                </div>
            </form>
            <List
                list={list}
                setList={setList}
                component={TaskComponent}
                onClickClose={handleClickClose}
                onClickFinish={handleListClickFinish}
            />
            <div className='bg-success p-2 text-dark bg-opacity-25 rounded'>
                <h3 className='m-3'>List of completed tasks</h3>
                <List
                    list={completedList}
                    setList={setCompletedList}
                    component={CompletedTaskComponent}
                    onClickClose={handleClickClose}
                />
            </div>
        </main>
    );
}

export { Main };
