import { VscClose } from "react-icons/vsc";
import React, { Fragment, useState } from "react";
import { Separator } from "@client/components/Separator";

export const Messages = (props: any) => {
    const [select, setSelect] = useState<any>([]);
    const [messages, setMessages] = useState(props.data);

    const handleClose = (_index) => {
        console.log(_index);
        const newList = messages.filter((m, index) => {
            return _index !== index;
        });
        setMessages(newList);
    };

    const createMessageClass = (type: string) => {
        switch (type) {
            case "E":
                return "text-red-500";
            case "W":
                return "text-blue-500";
            case "S":
                return "text-green-500";
            default:
                return "text-red-500";
        }
    };

    const createBodyClass = (type: string) => {
        switch (type) {
            case "E":
                return "bg-white";
            case "W":
                return "bg-white";
            case "S":
                return "bg-white";
            default:
                return "bg-white";
        }
    };
    const renderTitle = () => {
        if (messages && messages.length > 0) {
            return <Separator title={"پیام ها"} />;
        } else {
            return null;
        }
    };
    const renderMessages = () => {
        if (messages) {
            return messages.map((message, index) => {
                return (
                    <Fragment key={message.title + index.toString()}>
                        <ul
                            dir={"rtl"}
                            className={`${select.includes(index) ? "hidden" : "flex"
                            } flex-col  flex-wrap items-center w-full list-disc ${createBodyClass(message.type)}`}
                        >
                            <li className={"w-full h-auto min-h-12 flex flex-row justify-center items-center  p-2 border rounded"}
                                dir={"rtl"}>
                                <div className='flex flex-col w-11/12 h-auto justify-center'>
                                    <div className={`w-full mr-5 text-md font-bold h-10 flex items-center  ${createMessageClass((message.type))}`}>{message.label}</div>
                                    {(message.body) ?
                                        <div className={`w-full mr-5 text-sm text-gray-600 mt-2`}>{message.body}</div> : null}
                                </div>
                                <div className={"w-1/12"}>
                                    <div onClick={() => handleClose(index)}>
                                        <VscClose
                                            className={"text-gray-400 border-2 border-gray-300 rounded-full fill-current hover:cursor-pointer"}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </Fragment>
                );
            });
        } else {
            return null;
        }
    };

    return (
        <div dir={"rtl"}>
            {renderTitle()}
            {renderMessages()}
        </div>
    );
};
