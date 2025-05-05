export const linuxCommands = {
    name: "Linux",
    children: [
      {
        name: "Archivos",
        children: [
          { 
            name: "ls", 
            size: 100,
            description: "Lista archivos y directorios",
            example: "ls -l /home/user" 
          },
          { 
            name: "cd", 
            size: 80,
            description: "Cambia de directorio",
            example: "cd /var/www" 
          },
          {
            name: "touch",
            size: 50,
            description: "Crea archivos",
            example: "touch my_note.txt"
          }
        ]
      },
      {
        name: "Redes",
        children: [
          { 
            name: "ping", 
            size: 70,
            description: "Verifica conectividad con un host",
            example: "ping google.com" 
          }
        ]
      }
    ]
  };