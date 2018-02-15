Wire defines format of the data send across the wire from the service to webbrwoser.

The data structures are shared between backend and frontend projects trhough file duplication in the wire directories.  This is a perfect candidate for GIT submodule as an easy solution.  An alternative is to define a standalone NPM package.