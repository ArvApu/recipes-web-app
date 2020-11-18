import Users from './users.api';
import Recipes from './recipes.api';
import Comments from './comments.api';

const repositories = {
  users: Users,
  recipes: Recipes,
  comments: Comments,
}

class ApiFactory {
  get(name) {
    return repositories[name];
  }
}

export default new ApiFactory();