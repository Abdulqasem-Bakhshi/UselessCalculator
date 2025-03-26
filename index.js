import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import path from 'path';

const filePath = './data.json'; // Or adjust if it's in a different folder
const date = moment().format();

const data = {
  date: date,
};

// Write to data.json
jsonfile.writeFile(filePath, data, { spaces: 2 }, (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log(`File written to ${filePath}`);

  // Commit changes to Git
  const git = simpleGit();

  // Check if we're in a Git repo
  git.status((err, status) => {
    if (err) {
      console.error('Git status error:', err);
      return;
    }

    console.log('Git status:', status);

    if (status.files.length > 0) {
      git.add([filePath])
        .commit('Committing data.json', {'--date': date})
        .push()
        .then(() => {
          console.log('Changes pushed to GitHub');
        })
        .catch(err => {
          console.error('Error pushing changes to GitHub:', err);
        });
    } else {
      console.log('No changes to commit');
    }
  });
});