// Configuración y datos
const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  colorScheme: d3.schemeCategory10,
  data: {
    name: "Machine Learning",
    children: [
      {
        name: "Supervised Learning",
        children: [
          { name: "Linear Regression", value: 20 },
          { name: "Logistic Regression", value: 15 },
          { name: "Decision Trees", value: 18 },
          { name: "Random Forest", value: 22 },
          { name: "SVM", value: 15 }
        ]
      },
      {
        name: "Unsupervised Learning",
        children: [
          { name: "K-Means", value: 15 },
          { name: "PCA", value: 12 },
          { name: "t-SNE", value: 10 },
          { name: "DBSCAN", value: 8 }
        ]
      },
      {
        name: "Deep Learning",
        children: [
          { name: "Neural Networks", value: 25 },
          { name: "CNN", value: 20 },
          { name: "RNN/LSTM", value: 18 },
          { name: "Transformers", value: 22 },
          { name: "GANs", value: 15 }
        ]
      },
      {
        name: "Reinforcement Learning",
        children: [
          { name: "Q-Learning", value: 12 },
          { name: "Deep Q-Networks", value: 10 },
          { name: "Policy Gradients", value: 8 },
          { name: "A3C", value: 5 }
        ]
      },
      {
        name: "ML Operations",
        children: [
          { name: "Data Versioning", value: 10 },
          { name: "Model Deployment", value: 12 },
          { name: "Monitoring", value: 8 },
          { name: "AutoML", value: 10 }
        ]
      }
    ]
  }
};