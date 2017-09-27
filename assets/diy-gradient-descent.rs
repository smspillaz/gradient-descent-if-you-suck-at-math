/* Compute the loss over a single row */
fn loss_one(w: &Vec<f64>, t: &Vec<f64>) -> f64 {
  let len = t.len();
  let last = t[len - 1];

  /* label subtract each weight times the training data. First weight
   * is always independent of the training data */
  let error = last - (w[0] + t[0..(len - 1)].iter().enumerate().fold(0.0, |acc, (i, v)| {
    return acc + w[i + 1] * v;
  }));

  /* Squared error */
  return error * error;
}

/* Compute the loss over all rows in the training data (so
 * the sum of the squared errors) */
fn loss(w: &Vec<f64>, t: &Vec<Vec<f64>>) -> f64 {
  return t.iter().fold(0.0, |acc, tj| acc + loss_one(w, &tj)) / (t.len() as f64);
}

fn update(w: &Vec<f64>, t: &Vec<Vec<f64>>, lr: f64) -> Vec<f64> {
  /* Update each of the weights by taking the old weight value and
   * multiplying the by the sum of the partial derivatives of the
   * loss function with respect to each of the weights. Recall
   * that the loss function looked like this:
   *
   * loss(w_0, w_1, w_i ... w_n) =
   *   sum_j((t_n - (w_0 + w_1 * t0_j + w_2 * t1_2 * ... w_n * (t_(n -1))_j)^2)
   *
   * So the derivative (by the chain rule) is:
   *
   * d/dw_i = 2(t_n - (w_0 + w_1 * t0_j + w_2 * t1_2 * ... w_n * (t_(n -1))_j) *
   *              d/dw_i (t_n - (w_0 + w_1 * t0_j + w_2 * t1_2 * ... w_n * (t_(n -1))_j)
   *
   * And remember that applying partial derivatives means that we treat
   * all non-derived terms as constants, so the derivative of each of them
   * is zero. So to compute the derivative for w_1, we would have:
   *
   * 2(t_n - (w_0 + w_1 * t0_j + w_2 * t1_2 * ... w_n * (t_(n -1))_j) *
   *     (-t0_j)
   *
   * ie: -2(t_n - (w_0 + w_1 * t0_j + w_2 * t1_2 * ... w_n * (t_(n -1))_j) * t0_j
   *
   * Now, we treat the coefficient of "-2" as a scalar in all cases
   * and substitute with our learning rate, which allows us to partially
   * update each time. */
  let cardinality = t[0].len() - 1;

  /* Chain sets of each component of the training data, recall that
   * the training data is row-major so essentially we wish to transpose */
  let initial_derivs = vec![vec![1.0; t.len()]];
  let training_derivs = (0..cardinality).map(|i| {
    t.iter().map(|v| v[i]).collect::<Vec<_>>().to_vec()
  }).collect::<Vec<_>>().to_vec();
  let training_partial_derivs = initial_derivs.iter().chain(training_derivs.iter()).collect::<Vec<_>>().to_vec();
  let training_coefficients = t.iter().map(|v| {
    let initial_coefficients = vec![1.0];
    return initial_coefficients.iter().chain(v[0..cardinality].iter()).cloned().collect::<Vec<_>>().to_vec()
  }).collect::<Vec<_>>().to_vec();

  return w.iter().enumerate().map(|(i, prev)| {
    return prev + lr * (1.0 / (training_coefficients.len() as f64)) * (training_coefficients.iter().enumerate().fold(0.0, |acc, (k, v)| {
      let p1 = t[k][cardinality] - (v.iter().enumerate().fold(0.0, (|acc, (j, vj)| {
        return acc + (w[j] * vj);
      })));
      return acc + p1 * training_partial_derivs[i][k];
    }));
  }).collect::<Vec<_>>().to_vec();
}

/* Loop through the training data and compute the maximum value for each column,
 * this will be used as the "normalisation factor" below, such that all training
 * data is expressed in unit-scale */
fn normalization_factors(t: &Vec<Vec<f64>>) -> Vec<f64> {
  return (0..t[0].len()).map(|i| {
    return t.iter().fold(0.0, |acc, v| {
      if acc > v[i] {
        return acc;
      } else {
        return v[i];
      }
    });
  }).collect::<Vec<_>>().to_vec();
}

/* Using the computed maximum values above, compute normalized training
 * data by applying the normalization operator over each column */
fn normalize_columns(t: Vec<Vec<f64>>, maximums: &Vec<f64>) -> Vec<Vec<f64>> {
  return t.iter().map(|v| {
    v.iter().enumerate().map(|(j, x)| x / maximums[j]).collect::<Vec<_>>().to_vec()
  }).collect::<Vec<_>>().to_vec();
}

/* In order to simplify the weight update operations, prepend a single
 * training data column to all training data with the constant value of '1.0' -
 * this will take the value of x_0 such that we can multiply it with w_0 */
fn prepend_first_coefficient(t: Vec<Vec<f64>>) -> Vec<Vec<f64>> {
  return t.iter().map(|v| {
    println!("{:?}", vec![1.0].iter().chain(v.iter()).cloned().collect::<Vec<_>>().to_vec());
    return vec![1.0].iter().chain(v.iter()).cloned().collect::<Vec<_>>().to_vec();
  }).collect::<Vec<_>>().to_vec();
}

/* Using the weights, try and predict values from the test set */
fn predict(w: &Vec<f64>, t: &Vec<f64>) -> f64 {
  println!("{:?} {:?}", w, t);
  return w.iter().enumerate().fold(0.0, |acc, (i, w)| acc + w * t[i]);
}

fn main() {
  /* These values come from Andrew Ng's course on house prices */
  let train = vec![
    vec![2104f64, 5f64, 1f64, 45f64, 460f64],
    vec![1416f64, 3f64, 2f64, 40f64, 232f64],
    vec![1534f64, 3f64, 2f64, 30f64, 315f64],
    vec![852f64, 2f64, 1f64, 36f64, 178f64]
  ];
  let maximums = normalization_factors(&train);
  let normalized_train = normalize_columns(train, &maximums);

  let mut weights = vec![0.0; normalized_train[0].len()];
  let mut it = 0;

  loop {
    weights = update(&weights, &normalized_train, 0.01);
    let loss_now = loss(&weights, &normalized_train);
    
    it += 1;

    println!("Iteration {:?}, Loss {:?}, Weights {:?}", it, loss_now, weights);

    if it > 10000 {
      break;
    }
  }

  let test = prepend_first_coefficient(normalize_columns(vec![
    vec![3000f64, 2f64, 1f64, 20f64]
  ], &maximums));

  for td in test {
    println!("Predict from {:?} - {:?}", td, predict(&weights, &td) * maximums[maximums.len() - 1]);
  }
}