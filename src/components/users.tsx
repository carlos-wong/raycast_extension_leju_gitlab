import {
  ActionPanel,
  CopyToClipboardAction,
  ImageMask,
  List,
  OpenInBrowserAction,
  showToast,
  ToastStyle,
} from "@raycast/api";
import { User } from "../gitlabapi";
import { gitlab } from "../common";
import { useState, useEffect } from "react";
var _ = require("lodash");

export function GroupUserList(){
    const [searchText, setSearchText] = useState<string>();
    const { users, error, isLoading } = useSearchGroupUsers(searchText);

    if (error) {
        showToast(ToastStyle.Failure, "Cannot search Merge Requests", error);
    }

    if (!users) {
        return <List isLoading={true} searchBarPlaceholder="Loading" />;
    }

    return (
        <List searchBarPlaceholder="Filter Users by name..." isLoading={isLoading}>
            {users?.map((user) => (
                <KPIMarkUserListItem key={user.id} user={user} />
            ))}
        </List>
    );
}

export function KPIMarkUserListItem(props: { user: User }) {
    const user = props.user;
    var origin_kpi_marks = ["#good","#warn","#work","#thumbs_up","#thumbs_down","#thumbs_warn","#badcode","#delay","#qa"];

    var del_origin_thumbs_keyword_mark = _.map(origin_kpi_marks,(value:string)=>{
        return '#del' + _.split(value,"#")[1];
    });

    /* console.log("del_origin_thumbs_keyword_mark is:",del_origin_thumbs_keyword_mark); */

    var kpi_marks = _.concat(origin_kpi_marks,del_origin_thumbs_keyword_mark);

    /* console.log("kpi_marks:",kpi_marks); */

    var i = 0;
    return(<>
        {
            kpi_marks?.map((markcomment:string) => (
                <List.Item
                    id={user.id.toString() + markcomment}
                    title={user.username + " " +  markcomment + " " + user.username + " " +  markcomment}
                    icon={{ source: user.avatar_url, mask: ImageMask.Circle }}
                    actions={
                        <ActionPanel>
                            <CopyToClipboardAction title="Copy Comment" content={markcomment + " @" +user.username+ " @softdev-global"} />
                        </ActionPanel>
                    }
                />))
        }

    </>)
}




export function UserList() {
    const [searchText, setSearchText] = useState<string>();
  const { users, error, isLoading } = useSearch(searchText);

  if (error) {
    showToast(ToastStyle.Failure, "Cannot search Merge Requests", error);
  }

  if (!users) {
    return <List isLoading={true} searchBarPlaceholder="Loading" />;
  }

  return (
    <List searchBarPlaceholder="Filter Users by name..." onSearchTextChange={setSearchText} isLoading={isLoading}>
      {users?.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </List>
  );
}

export function UserListItem(props: { user: User }) {
  const user = props.user;
    return (
        <List.Item
            id={user.id.toString()}
            title={user.name}
            subtitle={user.username}
            icon={{ source: user.avatar_url, mask: ImageMask.Circle }}
            actions={
                <ActionPanel>
                    <OpenInBrowserAction url={user.web_url} />
                    <CopyToClipboardAction title="Copy User ID" content={user.id} />
                    <CopyToClipboardAction title="Copy Username" content={user.username} />
                    <CopyToClipboardAction title="Copy Name" content={user.name} />
                </ActionPanel>
            }
        />
    );
}

export function useSearch(query: string | undefined): {
  users?: User[];
  error?: string;
  isLoading: boolean;
} {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    // FIXME In the future version, we don't need didUnmount checking
    // https://github.com/facebook/react/pull/22114
    let didUnmount = false;

    async function fetchData() {
      if (query === null || didUnmount) {
        return;
      }

      setIsLoading(true);
      setError(undefined);
      try {
          const glUsers = await gitlab.getUsers({ searchText: query || "", searchIn: "title" })

          if (!didUnmount) {
              setUsers(glUsers);
        }
      } catch (e: any) {
        if (!didUnmount) {
          setError(e.message);
        }
      } finally {
        if (!didUnmount) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      didUnmount = true;
    };
  }, [query]);

  return { users, error, isLoading };
}

export function useSearchGroupUsers(query: string | undefined): {
  users?: User[];
  error?: string;
  isLoading: boolean;
} {
  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
    console.log("call useSearch");
  useEffect(() => {
    // FIXME In the future version, we don't need didUnmount checking
    // https://github.com/facebook/react/pull/22114
    let didUnmount = false;

    async function fetchData() {
      if (query === null || didUnmount) {
        return;
      }

      setIsLoading(true);
      setError(undefined);
        console.log("start to fetch users");
      try {
          const glUsers = await gitlab.getGroupUsers(115);

          if (!didUnmount) {
              setUsers(glUsers);
        }
      } catch (e: any) {
        if (!didUnmount) {
          setError(e.message);
        }
      } finally {
        if (!didUnmount) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      didUnmount = true;
    };
  }, [query]);

  return { users, error, isLoading };
}
