
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression

def py_float(val, decimals=2):
    return float(round(val, decimals))

class Variable:
    def __init__(self, metadata, data, idx=-1, regressor=None):
        metadata = metadata.strip()[2:].split()
        self.name = metadata[0]
        self.desc = ' '.join(metadata[1:]).strip()
        self.coef = py_float(regressor.coef_[idx], decimals=3) if regressor else None
        # self.data = [py_float(x) for x in data]
        self.idx = idx
        self._min = py_float(np.min(data))
        self._max = py_float(np.max(data))
        self.mean = py_float(np.mean(data))
        self.median = py_float(np.median(data))
        self.std = py_float(np.std(data))
        self.first = py_float(np.percentile(data, 0.25))
        self.third = py_float(np.percentile(data, 0.75))

    def to_dict(self):
        return {
            'name':   self.name,
            'desc':   self.desc,
            'coef': self.coef,
            'min':    self._min,
            'max':    self._max,
            'mean':   self.mean,
            'median': self.median,
            'std':    self.std,
            'first':  self.first,
            'third':  self.third,
            'value':  0
        }

def build_regression_model():
    cali_housing = fetch_california_housing()
    metadata_lines = cali_housing.DESCR.split('\n')
    
    regressor = LinearRegression()
    regressor.fit(cali_housing.data, cali_housing.target)

    indep_variables = {}

    for idx, line in enumerate(metadata_lines[12:20]):
        variable = Variable(line, cali_housing.data[:, idx], idx, regressor=regressor)
        indep_variables[variable.name] = variable.to_dict()

    return {
      'intercept':py_float(regressor.intercept_, decimals=3),
      'indepVariables':indep_variables,
      'depVariable':Variable('- ActualValues: the actual values of homes', cali_housing.target).to_dict()
    }
