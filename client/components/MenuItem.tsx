export const MenuItem = (props: { element: JSX.Element, href: any, title: any }) => <li
    className={
        'flex flex-row items-center justify-start  w-full h-12 p-4 bg-white  text-gray-700 text-base  border border-l-0 border-r-0 '
    }
>
    <a className={'mr-5 w-full flex flex-row items-center'} href={props.href}>
        <div className={''}>
            {props.element}
        </div>
        <div className={'mr-5'}>
            {props.title}
        </div>
    </a>
</li>;