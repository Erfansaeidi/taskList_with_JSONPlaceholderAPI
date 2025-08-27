document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const taskInput = document.getElementById("new-task");
    const addBtn = document.getElementById("add-task");
    const API_BASE_URL = "https://jsonplaceholder.typicode.com/todos";
    
    // Show loading state
    function showLoading() {
      const loadingDiv = document.createElement("div");
      loadingDiv.id = "loading";
      loadingDiv.textContent = "در حال بارگذاری...";
      loadingDiv.style.textAlign = "center";
      loadingDiv.style.padding = "20px";
      loadingDiv.style.color = "#666";
      
      // Clear the task list and add loading indicator
      taskList.innerHTML = "";
      taskList.appendChild(loadingDiv);
    }
    
    // Hide loading state
    function hideLoading() {
      const loadingDiv = document.getElementById("loading");
      if (loadingDiv) {
        loadingDiv.remove();
      }
    }
    
    // Show error message
    function showError(message) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = message || "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
      errorDiv.style.color = "#f44336";
      errorDiv.style.padding = "10px";
      errorDiv.style.margin = "10px 0";
      errorDiv.style.borderRadius = "8px";
      errorDiv.style.backgroundColor = "#ffebee";
      errorDiv.style.textAlign = "center";
      
      // Insert at the top of the container
      const container = document.querySelector(".container");
      container.insertBefore(errorDiv, container.firstChild.nextSibling);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        errorDiv.remove();
      }, 5000);
    }
    
    // Fetch tasks from API
    async function fetchTasks() {
      showLoading();
      
      try {
        const response = await fetch(`${API_BASE_URL}?_limit=10`);
        
        if (!response.ok) {
          throw new Error(`خطای API: ${response.status}`);
        }
        
        const tasks = await response.json();
        
        // Clear the task list
        taskList.innerHTML = "";
        
        // Add tasks to DOM
        tasks.forEach(task => {
          addTaskToDOM(task);
        });
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
        showError("خطا در دریافت وظایف. لطفا دوباره تلاش کنید.");
        taskList.innerHTML = "";
      } finally {
        hideLoading();
      }
    }
    
    // Add a new task via API
    async function addTask(title) {
      try {
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            completed: false,
            userId: 1 // Required by JSONPlaceholder
          })
        });
        
        if (!response.ok) {
          throw new Error(`خطای API: ${response.status}`);
        }
        
        const newTask = await response.json();
        addTaskToDOM(newTask);
        return newTask;
        
      } catch (error) {
        console.error("Error adding task:", error);
        showError("خطا در افزودن وظیفه. لطفا دوباره تلاش کنید.");
        return null;
      }
    }
    
    // Update a task via API
    async function updateTask(id, updates) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updates)
        });
        
        if (!response.ok) {
          throw new Error(`خطای API: ${response.status}`);
        }
        
        const updatedTask = await response.json();
        return updatedTask;
        
      } catch (error) {
        console.error(`Error updating task ${id}:`, error);
        showError("خطا در بروزرسانی وظیفه. لطفا دوباره تلاش کنید.");
        return null;
      }
    }
    
    // Delete a task via API
    async function deleteTask(id) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "DELETE"
        });
        
        if (!response.ok) {
          throw new Error(`خطای API: ${response.status}`);
        }
        
        return true;
        
      } catch (error) {
        console.error(`Error deleting task ${id}:`, error);
        showError("خطا در حذف وظیفه. لطفا دوباره تلاش کنید.");
        return false;
      }
    }
    
    // Toggle task completion status
    async function toggleTaskStatus(id, completed) {
      return await updateTask(id, { completed });
    }
    
    // Add task button click handler
    addBtn.addEventListener("click", async () => {
      const text = taskInput.value.trim();
      if(text) {
        const addedTask = await addTask(text);
        if (addedTask) {
          taskInput.value = "";
        }
      }
    });
    
    // Add task on Enter key press
    taskInput.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        const text = taskInput.value.trim();
        if(text) {
          const addedTask = await addTask(text);
          if (addedTask) {
            taskInput.value = "";
          }
        }
      }
    });
  
    function addTaskToDOM(task) {
      const li = document.createElement("li");
      li.dataset.id = task.id;
  
      if(task.completed) li.classList.add("done");
  
      const span = document.createElement("span");
      span.textContent = task.title;
  
      const actionDiv = document.createElement("div");
      actionDiv.style.display = "flex";
      actionDiv.style.gap = "5px";
  
      const editBtn = document.createElement("button");
      editBtn.className = "action-btn edit-btn btn-theme btn-secondary";
      editBtn.textContent = "✏️";
      editBtn.title = "ویرایش";
  
      const doneBtn = document.createElement("button");
      doneBtn.className = "action-btn done-btn btn-theme btn-secondary";
      doneBtn.textContent = "✔️";
      doneBtn.title = "انجام شد";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "action-btn delete-btn btn-theme btn-secondary";
      deleteBtn.textContent = "🗑️";
      deleteBtn.title = "حذف";
  
      actionDiv.append(editBtn, doneBtn, deleteBtn);
      li.append(span, actionDiv);
      taskList.appendChild(li);
  
      // Edit task
      editBtn.addEventListener("click", () => {
        if(li.querySelector(".delete-overlay")) return;
  
        const oldText = span.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldText;
        input.className = "edit-input";
  
        const controls = document.createElement("div");
        controls.className = "edit-controls";
        controls.innerHTML = `
          <button class="save-btn btn-theme btn-primary">Save</button>
          <button class="cancel-btn btn-theme btn-secondary">Cancel</button>
        `;
  
        span.replaceWith(input);
        li.appendChild(controls);
  
        // Hide action buttons
        actionDiv.style.display = "none";
  
        const restore = () => {
          input.replaceWith(span);
          controls.remove();
          actionDiv.style.display = "flex";
        };
  
        controls.querySelector(".save-btn").addEventListener("click", async () => {
          const newText = input.value.trim() || oldText;
          const taskId = li.dataset.id;
          
          const updatedTask = await updateTask(taskId, { title: newText });
          
          if (updatedTask) {
            span.textContent = newText;
          } else {
            span.textContent = oldText;
          }
          
          restore();
        });
  
        controls.querySelector(".cancel-btn").addEventListener("click", () => {
          restore();
        });
      });
  
      // Toggle task completion status
      doneBtn.addEventListener("click", async () => {
        const taskId = li.dataset.id;
        const isCurrentlyCompleted = li.classList.contains("done");
        const newStatus = !isCurrentlyCompleted;
        
        const updatedTask = await toggleTaskStatus(taskId, newStatus);
        
        if (updatedTask) {
          li.classList.toggle("done");
        }
      });
  
      // Delete task with confirmation overlay
      deleteBtn.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "delete-overlay";
        overlay.innerHTML = `
          <button class="confirm-delete btn-theme btn-danger">حذفش کن</button>
          <button class="cancel-delete btn-theme btn-secondary">شوخی کردم؛ بیخیال</button>
        `;
        li.appendChild(overlay);
        li.querySelectorAll(".action-btn").forEach(btn => btn.disabled = true);
  
        overlay.querySelector(".confirm-delete").addEventListener("click", async () => {
          const taskId = li.dataset.id;
          const deleted = await deleteTask(taskId);
          
          if (deleted) {
            li.remove();
          } else {
            overlay.remove();
            li.querySelectorAll(".action-btn").forEach(btn => btn.disabled = false);
          }
        });
        
        overlay.querySelector(".cancel-delete").addEventListener("click", () => {
          overlay.remove();
          li.querySelectorAll(".action-btn").forEach(btn => btn.disabled = false);
        });
      });
    }
    
    // Load tasks when page loads
    fetchTasks();
  });
  