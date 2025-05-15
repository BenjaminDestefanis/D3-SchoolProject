// Configuración y datos
const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  colorScheme: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
    "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5"],
  data: {
    name: "Aprendizaje Automático",
    children: [
      {
        name: "Aprendizaje Supervisado",
        children: [
          { name: "Regresión Lineal", value: 25 },
          { name: "Regresión Logística", value: 20 },
          { name: "Árboles de Decisión", value: 18 },
          { name: "Bosques Aleatorios", value: 22 },
          { name: "Máquinas de Vectores Soporte", value: 15 },
          { name: "Naive Bayes", value: 12 },
          { name: "Gradient Boosting", value: 20 }
        ]
      },
      {
        name: "Aprendizaje No Supervisado",
        children: [
          { name: "K-Means", value: 15 },
          { name: "Agrupamiento Jerárquico", value: 12 },
          { name: "PCA", value: 10 },
          { name: "t-SNE", value: 8 },
          { name: "DBSCAN", value: 7 },
          { name: "Análisis de Componentes Independientes", value: 5 }
        ]
      },
      {
        name: "Aprendizaje Profundo",
        children: [
          { name: "Redes Neuronales", value: 30 },
          { name: "CNN (Redes Convolucionales)", value: 25 },
          { name: "RNN/LSTM", value: 20 },
          { name: "Transformers", value: 22 },
          { name: "GANs", value: 15 },
          { name: "Autoencoders", value: 12 },
          { name: "Redes de Memoria", value: 8 }
        ]
      },
      {
        name: "Aprendizaje por Refuerzo",
        children: [
          { name: "Q-Learning", value: 15 },
          { name: "Deep Q-Networks", value: 12 },
          { name: "Policy Gradients", value: 10 },
          { name: "A3C", value: 8 },
          { name: "Algoritmos Evolutivos", value: 7 }
        ]
      },
      {
        name: "Procesamiento de Datos",
        children: [
          { name: "Limpieza de Datos", value: 20 },
          { name: "Ingeniería de Features", value: 22 },
          { name: "Selección de Features", value: 15 },
          { name: "Balanceo de Datos", value: 12 },
          { name: "Augmentación de Datos", value: 10 }
        ]
      },
      {
        name: "ML en Producción",
        children: [
          { name: "Versionado de Modelos", value: 15 },
          { name: "Despliegue de Modelos", value: 18 },
          { name: "Monitoreo", value: 12 },
          { name: "AutoML", value: 10 },
          { name: "Pipelines", value: 12 },
          { name: "Explicabilidad", value: 15 }
        ]
      },
      {
        name: "Casos de Uso",
        children: [
          { name: "Visión por Computadora", value: 25 },
          { name: "Procesamiento de Lenguaje", value: 22 },
          { name: "Sistemas de Recomendación", value: 18 },
          { name: "Detección de Fraude", value: 15 },
          { name: "Predicción de Series Temporales", value: 12 }
        ]
      }
    ]
  }
};