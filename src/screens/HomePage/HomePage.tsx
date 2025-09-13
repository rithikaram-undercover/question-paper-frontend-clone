import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { SettingsIcon, PlusIcon, FileTextIcon, BarChart3Icon, UsersIcon } from "lucide-react";

const classes = [
  { id: "class-6", name: "Class 6", subjects: ["Mathematics", "Science", "English"] },
  { id: "class-7", name: "Class 7", subjects: ["Mathematics", "Science", "English"] },
  { id: "class-8", name: "Class 8", subjects: ["Mathematics", "Science", "English"] },
  { id: "class-9", name: "Class 9", subjects: ["Mathematics", "Science", "English"] },
  { id: "class-10", name: "Class 10", subjects: ["Mathematics", "Science", "English"] },
  { id: "class-11", name: "Class 11", subjects: ["Physics", "Chemistry", "Biology"] },
  { id: "class-12", name: "Class 12", subjects: ["Physics", "Chemistry", "Biology"] }
];

const quickActions = [
  {
    id: "create-question-paper",
    title: "Create Question Paper",
    description: "Generate new question papers for your classes",
    icon: FileTextIcon,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600"
  },
  {
    id: "manage-questions",
    title: "Manage Questions",
    description: "Add, edit, or organize your question bank",
    icon: PlusIcon,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600"
  },
  {
    id: "view-analytics",
    title: "View Analytics",
    description: "Track performance and generate reports",
    icon: BarChart3Icon,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600"
  },
  {
    id: "manage-students",
    title: "Manage Students",
    description: "Add and organize student information",
    icon: UsersIcon,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600"
  }
];

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClassClick = (className: string) => {
    navigate(`/question-paper-setup/${className.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              className="w-8 h-8"
              alt="Document icon"
              src="/document-icon-v2-1.svg"
            />
            <h1 className="text-xl font-bold text-gray-900">Examaker</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Settings
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">T</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Teacher!</h2>
          <p className="text-gray-600">Manage your classes and create question papers efficiently</p>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Card key={action.id} className={`cursor-pointer hover:shadow-md transition-shadow ${action.color}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${action.iconColor}`} />
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Classes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Classes</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Add Class
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classes.map((classItem) => (
              <Card 
                key={classItem.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white border border-gray-200"
                onClick={() => handleClassClick(classItem.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {classItem.name.split(' ')[1]}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{classItem.name}</h4>
                  
                  <div className="space-y-1 mb-4">
                    {classItem.subjects.slice(0, 2).map((subject, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {subject}
                      </div>
                    ))}
                    {classItem.subjects.length > 2 && (
                      <div className="text-sm text-gray-500">
                        +{classItem.subjects.length - 2} more
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Active</span>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClassClick(classItem.name);
                      }}
                    >
                      Create Paper
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">Your recent question papers and activities will appear here</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};