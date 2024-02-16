const enums = require("../enums");
const { Role } = require("../models/index.model");

module.exports = async () => {
  try {
    const rolesToInsert = [
      {
        name: enums.roles.VIEWER,
        permissions: {
          createAndAssignAdmin: false,
          assignUserPermissionToAccessSubscription: false,
          editingUserInformation: false,
          managingAndCreatingGroupsAndViewers: false,
          editMapakiPortalTheme: false,
          uploadingReuploadingMovingFoldersFiles: false,
          editingAndDeletingFiles: false,
          assignFilePermissions: false,
          viewingFiles: true,
          downloadingFiles: true,
          accessVersionsAndTrash: false,
          creatingMaps: false,
          accessingAndConfiguringMapSettings: false,
          uploadingData: false,
          editingLayer: false,
          deletingMap: false,
          viewingMap: true,
          assigningGroupPermissionsWithinOrg: false,
          accessingAssetOverview: true,
          configuringAssetOverview: false,
          accessingViewingWorkOrders: true,
          creatingEditingNewWorkOrder: false,
          configuringWorkOrderPage: false,
          accessingContactPage: false,
          editingCreatingNewContact: false,
        },
      },
      {
        name: enums.roles.EDITOR,
        permissions: {
          createAndAssignAdmin: false,
          assignUserPermissionToAccessSubscription: false,
          editingUserInformation: false,
          managingAndCreatingGroupsAndViewers: false,
          editMapakiPortalTheme: false,
          uploadingReuploadingMovingFoldersFiles: true,
          editingAndDeletingFiles: true,
          assignFilePermissions: true,
          viewingFiles: true,
          downloadingFiles: true,
          accessVersionsAndTrash: true,
          creatingMaps: true,
          accessingAndConfiguringMapSettings: true,
          uploadingData: true,
          editingLayer: true,
          deletingMap: true,
          viewingMap: true,
          assigningGroupPermissionsWithinOrg: true,
          accessingAssetOverview: true,
          configuringAssetOverview: true,
          accessingViewingWorkOrders: true,
          creatingEditingNewWorkOrder: true,
          configuringWorkOrderPage: true,
          accessingContactPage: true,
          editingCreatingNewContact: true,
        },
      },
      {
        name: enums.roles.ADMIN,
        permissions: {
          createAndAssignAdmin: false,
          assignUserPermissionToAccessSubscription: true,
          editingUserInformation: true,
          managingAndCreatingGroupsAndViewers: true,
          editMapakiPortalTheme: true,
          uploadingReuploadingMovingFoldersFiles: true,
          editingAndDeletingFiles: true,
          assignFilePermissions: true,
          viewingFiles: true,
          downloadingFiles: true,
          accessVersionsAndTrash: true,
          creatingMaps: true,
          accessingAndConfiguringMapSettings: true,
          uploadingData: true,
          editingLayer: true,
          deletingMap: true,
          viewingMap: true,
          assigningGroupPermissionsWithinOrg: true,
          accessingAssetOverview: true,
          configuringAssetOverview: true,
          accessingViewingWorkOrders: true,
          creatingEditingNewWorkOrder: true,
          configuringWorkOrderPage: true,
          accessingContactPage: true,
          editingCreatingNewContact: true,
        },
      },
      {
        name: enums.roles.CESADMIN,
        permissions: {
          createAndAssignAdmin: true,
          assignUserPermissionToAccessSubscription: true,
          editingUserInformation: true,
          managingAndCreatingGroupsAndViewers: true,
          editMapakiPortalTheme: true,
          uploadingReuploadingMovingFoldersFiles: true,
          editingAndDeletingFiles: true,
          assignFilePermissions: true,
          viewingFiles: true,
          downloadingFiles: true,
          accessVersionsAndTrash: true,
          creatingMaps: true,
          accessingAndConfiguringMapSettings: true,
          uploadingData: true,
          editingLayer: true,
          deletingMap: true,
          viewingMap: true,
          assigningGroupPermissionsWithinOrg: true,
          accessingAssetOverview: true,
          configuringAssetOverview: true,
          accessingViewingWorkOrders: true,
          creatingEditingNewWorkOrder: true,
          configuringWorkOrderPage: true,
          accessingContactPage: true,
          editingCreatingNewContact: true,
        },
      },
    ];

    for (const roleData of rolesToInsert) {
      const existingRole = await Role.findOne({
        where: { name: roleData.name },
      });
      if (existingRole) {
        console.log(
          `Role '${roleData.name}' already exists, skipping insertion.`
        );
      } else {
        await Role.create(roleData);
        console.log(`Role '${roleData.name}' inserted successfully.`);
      }
    }
  } catch (error) {
    console.error("Error inserting roles:", error);
  }
};
