import { useState } from 'react';
import { ListTypeEnum } from '../enums/ListTypeEnum';
import { convertDateToHms } from '../utils/dateUtils';
import { TaskStageEnum } from '../enums/TaskStageEnum';

function TaskComponent({ item, onClickClose, onClickFinish }) {
    const [stage, setStage] = useState(TaskStageEnum.Undefined);

    function onClickButtonStart(elem) {
        elem.timeRangeArray = [
            ...elem.timeRangeArray,
            { startPointOb: Date.now(), stopPointOb: 0 },
        ];
        setStage(TaskStageEnum.Started);
    }

    function onClickButtonStop(elem) {
        const stopPoint = Date.now();
        const iterationsCount = elem.timeRangeArray.length - 1;
        if (stage === TaskStageEnum.Undefined) {
            elem.timeRangeArray[0].stopPointOb = 0;
        } else {
            elem.timeRangeArray[iterationsCount].stopPointOb = stopPoint;
        }
        setStage(TaskStageEnum.Stopped);
        return elem.timeRangeArray;
    }

    function onClickButtonFinish() {
        const timeRangeArray =
            stage !== TaskStageEnum.Started
                ? item.timeRangeArray
                : onClickButtonStop(item);
        const allTime = sumTimeRange(timeRangeArray);
        item.spentTime = convertDateToHms(allTime);
        onClickFinish(item);
    }

    function sumTimeRange(array) {
        let allTime = 0;
        array.forEach((range) => {
            allTime += range.stopPointOb - range.startPointOb;
        });
        return allTime;
    }

    return (
        <li className='list-group-item fs-3 d-flex justify-content-between align-items-center'>
            {item.name}
            {stage === TaskStageEnum.Started && (
                <div className='spinner-grow' role='status'>
                    <span className='visually-hidden'>Execution...</span>
                </div>
            )}
            <div
                className='d-flex justify-content-between btn-group-sm'
                style={{ minWidth: '12rem' }}>
                {stage === TaskStageEnum.Started ? (
                    <button
                        className='btn btn-danger rounded'
                        onClick={() => onClickButtonStop(item)}>
                        Stop
                    </button>
                ) : (
                    <button
                        className='btn btn-success rounded'
                        onClick={() => onClickButtonStart(item)}>
                        Start
                    </button>
                )}

                <button
                    className='btn  btn-outline-dark rounded'
                    onClick={() => onClickButtonFinish()}>
                    Finish
                </button>
                <button
                    type='button'
                    className='btn-close'
                    onClick={() =>
                        onClickClose(item.id, ListTypeEnum.Current)
                    }></button>
            </div>
        </li>
    );
}
export { TaskComponent };
