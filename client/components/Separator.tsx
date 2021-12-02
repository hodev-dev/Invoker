import React from 'react';

export const Separator = (props: { title }) => <li
    className={'flex items-center w-full h-12 p-4 text-sm text-gray-500 bg-gray-50'}>
    {props.title}
</li>;