import { ViewConfiguration } from './types';

interface RecursionSet {
  configurationData: any;
  viewModelData: any;
}

function* mapRecursively(set: RecursionSet): any {
  const { viewModelData: tradeData, configurationData: productData } = set;
  if (!tradeData) {
    return;
  }

  for (const key of Object.keys(tradeData)) {
    const r = productData[key];
    const t = tradeData[key];
    if (!r) {
      continue;
    }

    if (r.default !== undefined) {
      tradeData[key] = r.default;
    }

    if (t) {
      yield* mapRecursively({
        configurationData: r,
        viewModelData: t,
      });
    }
  }
}

export function mapDefaults<T>(configuration: ViewConfiguration<T, T>, viewModel: T) {
  const it = mapRecursively({
    configurationData: configuration,
    viewModelData: viewModel,
  });

  const result = it.next();
  while (!result.done) {
    it.next();
  }
}
