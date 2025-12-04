import { useState } from "react";
import { Plus, Trash2, Save, Image, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Luxury Residential Tower",
      category: "Residential",
      description: "Premium passenger elevators with custom interiors for a 25-floor luxury apartment complex.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Commercial Business Center",
      category: "Commercial",
      description: "High-speed elevators installed in a modern 40-story office building.",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop",
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  const addProject = () => {
    if (!newProject.title || !newProject.category || !newProject.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const project: Project = {
      id: Date.now(),
      ...newProject,
      image: newProject.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    };

    setProjects([...projects, project]);
    setNewProject({ title: "", category: "", description: "", image: "" });
    toast({
      title: "Success",
      description: "Project added successfully!",
    });
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast({
      title: "Deleted",
      description: "Project removed successfully.",
    });
  };

  const saveChanges = () => {
    // In a real app, this would save to a database
    toast({
      title: "Saved",
      description: "All changes have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="font-bold text-primary">Admin Dashboard</span>
            </div>
          </div>
          <Button onClick={saveChanges} className="bg-secondary hover:bg-secondary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Project Form */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-secondary" />
                Add New Project
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Project Title *</label>
                  <Input
                    placeholder="e.g., Luxury Hotel"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Category *</label>
                  <Input
                    placeholder="e.g., Commercial, Residential"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Image URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Description *</label>
                  <Textarea
                    placeholder="Describe the project..."
                    rows={4}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
                
                <Button onClick={addProject} className="w-full bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6">
              Current Projects ({projects.length})
            </h2>
            
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="glass-card p-4 flex gap-4">
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold truncate">{project.title}</h3>
                        <span className="text-xs text-secondary font-medium">{project.category}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No projects yet. Add your first project!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
