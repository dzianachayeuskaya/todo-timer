import { ListTypeEnum } from '../enums/ListTypeEnum';

function CompletedTaskComponent({ item, onClickClose }) {
    return (
        <li className='list-group-item fs-3 d-flex justify-content-between align-items-center'>
            {item.name}
            <div className='fs-4 fw-lighter'>Spent time: {item.spentTime}</div>
            <button
                type='button'
                className='btn-close'
                onClick={() => {
                    onClickClose(item.id, ListTypeEnum.Completed);
                }}></button>
        </li>
    );
}
export { CompletedTaskComponent };
