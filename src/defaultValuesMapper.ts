import { ViewConfiguration } from './types';

interface RecursionSet {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configurationData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewModelData: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* mapRecursively(set: RecursionSet): any {
  const { viewModelData: data, configurationData: productData } = set;
  if (!data) {
    return;
  }

  for (const key of Object.keys(data)) {
    const r = productData[key];
    const d = data[key];
    if (!r) {
      continue;
    }

    if (d.constructor === Array) {
      for (let i = 0; i < data[key].length; i++) {
        yield* mapRecursively({
          configurationData: r,
          viewModelData: d[i],
        });
      }
    }

    if (r.default !== undefined) {
      data[key] = r.default;
    }

    if (d) {
      yield* mapRecursively({
        configurationData: r,
        viewModelData: d,
      });
    }
  }
}

export function mapDefaults<T>(configuration: ViewConfiguration<T, T>, viewModel: T): void {
  const it = mapRecursively({
    configurationData: configuration,
    viewModelData: viewModel,
  });

  const result = it.next();
  while (!result.done) {
    it.next();
  }
}
