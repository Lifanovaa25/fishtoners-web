# app/providers

## Обзор
Здесь находятся все оболчки над приложениям.

### Использование

1. **Общий вид оболочки:**
```javascript
export const withWrapper = (component: () => ReactNode) => () => component()
```

2. **Используется в ./index.ts:**
```javascript
import compose from 'compose-function';
import {withWrapper} from '/with-wrapper'

export const withProviders = compose(
  withWrapper,
  ...
);
```

3. **Использование `withProviders` происходит в компоненте `App`, при его импорте**
```javascript
export default withProviders(App);
```

### Исключение
Можно применять типичный вид hoc компонента, как это делается в `with-wagmi-init`, но очень не рекомендуется, т.к. портит общую стилистику.