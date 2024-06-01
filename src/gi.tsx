import { ActionPanel, CopyToClipboardAction,List,getPreferenceValues } from "@raycast/api";
import { IssueList, IssueScope, IssueState } from "./components/issues";
import { GroupUserList,UserList } from "./components/users";
import { useEffect, useState } from "react";


interface Preferences {
    instance?: string;
    token?: string;
}


export default function Command() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 200);
        const preferences: Preferences = getPreferenceValues();

    }, []);
    /* return(<IssueList scope={IssueScope.created_by_me} state={IssueState.all} />) */
    return(<GroupUserList />);
}
