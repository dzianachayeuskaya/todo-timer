function List({ list, component, onClickClose, onClickFinish }) {
    const Component = component;

    return (
        <>
            <ul className='list-group list-group-flush mb-5'>
                {list.map((item) => (
                    <Component
                        item={item}
                        key={item.id}
                        onClickClose={onClickClose}
                        onClickFinish={onClickFinish}
                    />
                ))}
            </ul>
        </>
    );
}
export { List };
