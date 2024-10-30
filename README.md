## For deployment

Clone repository

```
git clone git@github.com:speechlabinc/translate-ui-react.git
```

Install dependencies

```
yarn
```

Build project

```
yarn dev
```

App will build into `.next` folder



```bash
yarn dev
```

App will be listening port `3000`

## For development

First, run the development server:

```bash
yarn dev
```

Install Storybook in your development environment:

```bash
yarn
```

## Storybook

Install storybook addons if missing they should be there though!!!
```bash
yarn add @storybook/addon-links @storybook/addon-essentials @storybook/addon-onboarding @storybook/addon-interactions --dev
yarn add @storybook/testing-library --dev

```

Install next.js Preset if missing
```bash
yarn add @storybook/nextjs --dev
```


Running Storybook:

```bash
yarn storybook
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
