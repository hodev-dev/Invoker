import { View } from "@core/View";
import { UserDashboardTemplate } from "@client/pages/user/UserDashboardTemplate";

export const UserDashboardView = (props: any) => {
    return (
        <UserDashboardTemplate select={"support"}>
            <h1>test</h1>
        </UserDashboardTemplate>
    );
};

View.get().then((serverData) => {
    View.render(UserDashboardView, serverData);
});
