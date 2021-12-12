import { View } from "@core/View";
import React from "react";
import { UserDashboardTemplate } from "@client/pages/user/UserDashboardTemplate";
import { Separator } from "@client/components/Separator";
// @ts-ignore
let moment = require("moment-jalaali");
require("moment/locale/fa");


export const UserSupportView = (props: { tickets, _page } | any) => {
    const renderTickets = () => {
        if (props.tickets && props.tickets.data) {
            return props.tickets.data.map((ticket, index) => {
                return (
                    <div
                        key={ticket.id + ticket.title}
                        className={
                            "flex items-center divide-x-2 justify-start  w-full h-12 p-4 hover:bg-gray-50 hover:cursor-pointer bg-white  text-gray-600 text-base  border border-l-0 border-r-0 "
                        }
                    >
                        <div className={"w-1/12 mr-2 flex items-center justify-start text-gray-400 text-sm "}>
                            {index + 1}
                        </div>
                        <div className={"w-8/12 mr-2 flex items-center justify-start text-sm "}>
                            {ticket.title}
                        </div>
                        <div className='w-3/12 mr-2 flex items-center justify-center text-sm '>
                            {moment(ticket.created_at).format("jYYYY/jM/jD  HH:mm:ss")}
                        </div>
                        <div className={"w-3/12 mr-2 flex items-center justify-center text-sm "}>
                            {ticket.status}
                        </div>
                    </div>
                );
            });
        }
        return <h1>empty</h1>;
    };

    const pagination = () => {
        const { total, per_page, index } = props.tickets;
        let pages = Math.ceil(total / per_page);
        if (pages === 0) {
            pages = 1;
        }
        return Array.from({ length: pages }, (x, i) => i).map((page_number) => {
            return (
                <a key={"page" + page_number} href={`/user/support?page=${page_number + 1}`} className={`mr-5 w-8 h-8 text-center bg-white rounded ${(props._page == page_number) ? "text-black" : "text-gray-400"} border  flex items-center justify-center`}>{page_number + 1}</a>
            );
        });
    };
    return (
        <UserDashboardTemplate select={"support"}>
            <Separator title={"تیکت ها"} />
            <div
                className={
                    "flex items-center divide-x-2 justify-start  w-full h-12 p-4 bg-gray-50  text-gray-50 text-base  border border-l-0 border-r-0 "
                }
            >
                <div className={"w-1/12 mr-2 flex items-center justify-start text-gray-400 text-sm"}>
                    {"ردیف"}
                </div>
                <div className={"w-8/12 mr-2 flex items-center justify-start text-gray-400 text-sm"}>
                    {"عنوان"}
                </div>
                <div className='w-3/12 mr-2 flex items-center justify-center text-gray-400 text-sm'>
                    {"تاریخ ایحاد تیکت"}
                </div>
                <div className={"w-3/12 mr-2 flex items-center justify-center text-gray-400 text-sm"}>
                    {"وضعیت"}
                </div>
            </div>
            {renderTickets()}
            <Separator title={"صفحه ها"} />
            <div className='flex flex-wrap flex-row w-full'>
                {pagination()}
            </div>
        </UserDashboardTemplate>
    );
};

View.get().then((serverData) => {
    View.render(UserSupportView, serverData);
});
