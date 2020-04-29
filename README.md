# 声明

该解决方案是一种违背了graphql按需获取的本意，对于graphql初次接入的前端同学提供自动生成的graphql request代码。
由于该程序并不能揣测开发者对graphql按需的本意，所以将graphql的返回值按照depth深度进行按照深度返回全量的schema，减少大家拼写gql的难度。


# 建议

希望大家在对graphql 基本数量的情况下按照graphql按需拿去的本意进行重构代码，该工具暂当应急使用。


## 使用方式：

```
yarn add graphql-gen-request -global

```

```
gqlgenreq --remote http://xxxxx/graphql --destDirPath ./  --maxLevel 3

```

