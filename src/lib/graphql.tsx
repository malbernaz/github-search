import React from "react";
import {
  ClientContext,
  GraphQLClient,
  UseQueryOptions,
  ClientOptions,
  useQuery as useQueryHook,
} from "graphql-hooks";
import * as gql from "~/graphql";
import { TypedDocumentString } from "~/graphql/graphql";

export function graphql<T extends Parameters<typeof gql.graphql>[0]>(
  source: TemplateStringsArray,
) {
  return gql.graphql(source.raw[0] as T);
}

export function useQuery<
  TSource extends TypedDocumentString<any, any>,
  TResult extends ReturnType<NonNullable<TSource["__apiType"]>>,
  TVariables extends Parameters<NonNullable<TSource["__apiType"]>>[0],
>(query: TSource, opts?: UseQueryOptions<TResult, TVariables>) {
  return useQueryHook<TResult, TVariables>(query.toString(), opts);
}

export function GraphQLProvider({
  children,
  options,
}: React.PropsWithChildren<{ options: ClientOptions }>) {
  const optionsRef = React.useRef(options);
  const [client, setClient] = React.useState(new GraphQLClient(options));

  React.useEffect(() => {
    if (options !== optionsRef.current) {
      setClient(new GraphQLClient(options));
    }
  }, [options]);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
}
