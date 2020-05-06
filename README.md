# 声明

该解决方案是一种违背了 graphql 按需获取的本意，对于 graphql 初次接入的前端同学提供自动生成的 graphql request 代码。
由于该程序并不能揣测开发者对 graphql 按需的本意，所以将 graphql 的返回值按照 depth 深度进行按照深度返回全量的 schema，减少大家拼写 gql 的难度。

# 建议

希望大家在对 graphql 基本数量的情况下按照 graphql 按需拿去的本意进行重构代码，该工具暂当应急使用。

## 使用方式：

```
yarn add graphql-gen-request -global

```

```
gqlgenreq --remote http://xxxxx/graphql --destDirPath ./  --maxLevel 3

```

## Example

schema

```
type Mutation {
  CreatePerson(person: PersonCreate): Person
}

type Person {
  ID: Int!
  Name: String!
  Age: Int!
}

input PersonCreate {
  Name: String!
  Aage: Int!
}

type Query {
  getPersonByID(ID: Int!): Person
}

```

output:

```
import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
   __typename?: 'Mutation';
  CreatePerson?: Maybe<Person>;
};


export type MutationCreatePersonArgs = {
  person?: Maybe<PersonCreate>;
};

export type Person = {
   __typename?: 'Person';
  ID: Scalars['Int'];
  Name: Scalars['String'];
  Age: Scalars['Int'];
};

export type PersonCreate = {
  Name: Scalars['String'];
  Aage: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  getPersonByID?: Maybe<Person>;
};


export type QueryGetPersonByIdArgs = {
  ID: Scalars['Int'];
};

export type CreatePersonMutationVariables = {
  person?: Maybe<PersonCreate>;
};


export type CreatePersonMutation = (
  { __typename?: 'Mutation' }
  & { CreatePerson?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'ID' | 'Name' | 'Age'>
  )> }
);

export type GetPersonByIdQueryVariables = {
  ID: Scalars['Int'];
};


export type GetPersonByIdQuery = (
  { __typename?: 'Query' }
  & { getPersonByID?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'ID' | 'Name' | 'Age'>
  )> }
);


export const CreatePersonDocument = gql`
    mutation CreatePerson($person: PersonCreate) {
  CreatePerson(person: $person) {
    ID
    Name
    Age
  }
}
    `;
export const GetPersonByIdDocument = gql`
    query getPersonByID($ID: Int!) {
  getPersonByID(ID: $ID) {
    ID
    Name
    Age
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreatePerson(variables?: CreatePersonMutationVariables): Promise<CreatePersonMutation> {
      return withWrapper(() => client.request<CreatePersonMutation>(print(CreatePersonDocument), variables));
    },
    getPersonByID(variables: GetPersonByIdQueryVariables): Promise<GetPersonByIdQuery> {
      return withWrapper(() => client.request<GetPersonByIdQuery>(print(GetPersonByIdDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
```
