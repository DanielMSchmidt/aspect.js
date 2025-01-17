# Introduction

Library for aspect-oriented programming with JavaScript, which takes advantage of ECMAScript 2016 decorators syntax.

For further reading on decorators, take a look at [the spec](https://github.com/wycats/javascript-decorators).

Blog post, introduction to the AOP and the library could be found [here](http://blog.mgechev.com/2015/07/29/aspect-oriented-programming-javascript-aop-js).

Talk from [AngularConnect](https://www.youtube.com/watch?v=C6e6-31HD5A).

# Sample usage

```ts

import {beforeMethod, Wove, Metadata} from 'aspect.js';

class LoggerAspect {
  @beforeMethod({
    classNamePattern: /^Article/,
    methodNamePattern: /^(get|set)/
  })
  invokeBeforeMethod(meta: Metadata) {
    console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
  }
}

class Article {
  id: number;
  title: string;
  content: string;
}

@Wove()
class ArticleCollection {
  articles: Article[] = [];
  getArticle(id: number) {
    console.log(`Setting article with id: ${id}.`);
    return this.articles.filter(a => {
      return a.id === id;
    }).pop();
  }
  setArticle(article: Article) {
    console.log(`Setting article with id: ${article.id}.`);
    this.articles.push(article);
  }
}

new ArticleCollection().getArticle(1);

// Result:
// Inside of the logger. Called ArticleCollection.getArticle with args: 1.
// Setting article with id: 1.

```


# API

The library offers the following combinations of advices and joint points:

## Method calls

- `beforeMethod(MethodSelector)` - invoked before method call
- `afterMethod(MethodSelector)` - invoked after method call
- `aroundMethod(MethodSelector)` - invoked around method call
- `onThrowOfMethod(MethodSelector)` - invoked on throw of method call

## Static method calls

- `beforeStaticMethod(MethodSelector)` - invoked before static method call
- `afterStaticMethod(MethodSelector)` - invoked after static method call
- `aroundStaticMethod(MethodSelector)` - invoked around static method call
- `onThrowOfStaticMethod(MethodSelector)` - invoked on throw of static method call

## Accessors

- `beforeSetter(MemberSelector)` - invoked before setter call
- `afterSetter(MemberSelector)` - invoked after setter call
- `aroundSetter(MemberSelector)` - invoked around setter call
- `onThrowOfSetter(MemberSelector)` - invoked on throw of setter call
- `beforeGetter(MemberSelector)` - invoked before getter call
- `afterGetter(MemberSelector)` - invoked after getter call
- `aroundGetter(MemberSelector)` - invoked around getter call
- `onThrowOfGetter(MemberSelector)` - invoked on throw of getter call

## `MethodSelector`

```ts
export interface MethodSelector {
  classNamePattern: RegExp;
  methodNamePattern: RegExp;
}
```

## `MemberSelector`

```ts
export interface MemberSelector {
  classNamePattern: RegExp;
  fieldNamePattern: RegExp;
}
```

## `Metadata`

```ts
export class Metadata {
  public method: MethodMetadata;
  public className: string;
}
```

## `MethodMetadata`

```ts
export class MethodMetadata {
  public proceed: boolean;
  public name: string;
  public args: any[];
  public context: any;
  public result: any;
  public exception: any;
}
```

# Disclaimer

The library is in early stage of development. It's API most likely will change.

# Demo

```
git clone https://github.com/mgechev/aop.js --depth 1
npm install -g ts-node
ts-node demo/index.ts
```

# Roadmap

- [x] Tests
- [x] Type annotations and DTS generation
- [x] Aspect factories
  - [x] Generic aspects
- [x] Implement the following advices:
  - [x] Before
  - [x] After
    - [x] Throwing
    - [x] Returning
  - [x] Around
- [ ] Implement the following joint points:
  - [x] Method execution
  - [x] Static method execution
  - [ ] Constructor execution
  - [x] Filed get
  - [x] Field set

# License

MIT
