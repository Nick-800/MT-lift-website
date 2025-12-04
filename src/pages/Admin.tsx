import { useState } from "react";
import { Plus, Trash2, Save, Image, ArrowLeft } from "lucide-react";
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
        title: "Missing fields",
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
    toast({ title: "Project added" });
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast({ title: "Project deleted" });
  };

  const saveChanges = () => {
    toast({ title: "Changes saved" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-7 w-auto" />
              <span className="font-semibold text-sm">Admin</span>
            </div>
          </div>
          <button onClick={saveChanges} className="btn-primary text-sm py-2">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="lg:col-span-1">
            <div className="card-elevated sticky top-24">
              <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <Plus className="w-4 h-4 text-secondary" />
                Add Project
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Title</label>
                  <Input
                    placeholder="Project name"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="bg-background"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Category</label>
                  <Input
                    placeholder="e.g., Commercial"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="bg-background"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Image URL</label>
                  <Input
                    placeholder="https://..."
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="bg-background"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Description</label>
                  <Textarea
                    placeholder="Brief description..."
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="bg-background resize-none"
                  />
                </div>
                
                <button onClick={addProject} className="btn-primary w-full text-sm">
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-5">
              Projects ({projects.length})
            </h2>
            
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="card-elevated flex gap-4 p-4">
                  <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-sm">{project.title}</h3>
                        <span className="text-xs text-secondary">{project.category}</span>
                      </div>
                      <button
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1.5 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Image className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No projects yet</p>
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
