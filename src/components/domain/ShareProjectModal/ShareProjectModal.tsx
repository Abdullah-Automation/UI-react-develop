import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Dialog,
  OutlinedInput,
  SelectChangeEvent,
  InputLabel,
  ClickAwayListener,
  Tooltip,
  Typography,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { makeStyles } from '@mui/styles';

import { Button, ErrorText } from '~/components/ui';
import {
  HeaderWrapper,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from '~/components/domain';
import {
  ICollaboration,
  ICollaborationRole,
  IProjectCollaborations,
  CollaborationsApi,
  ProjectsApi,
  ICopyUrlParams,
} from '~/api';
import { useAuth, useToast } from '~/context';
import { trackShareProject } from '~/utils/helpers';
import { Select } from '~/components/ui/Select/Select';

const styles = makeStyles(() => ({
  root: {
    '& $notchedOutline': {
      border: 'none',
    },
    '&:hover $notchedOutline': {
      border: 'none',
    },
    '&$focused $notchedOutline': {
      border: 'none',
    },
  },
  focused: {},
  notchedOutline: {},
}));

interface IShareProjectModalProps {
  open: boolean;
  projectName: string;
  projectId: string;
  handleClose: () => void;
}

interface IUpdateProjectCollabVariables {
  collaborationId: string;
  collaborationRoleId: string;
  status: string;
}

const schema = yup
  .object({
    inviteeEmail: yup.string().email().required('Email is required'),
  })
  .required();

export const ShareProjectModal = ({
  open,
  projectName,
  projectId,
  handleClose,
}: IShareProjectModalProps) => {
  const { currentUser } = useAuth();
  const { showErrorToast } = useToast();

  // @ts-ignore
  const [error, setError] = useState<boolean>(false);
  const [projectError, setProjectError] = useState<string>('');
  const [permission, setPermission] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [openTip, setOpenTip] = useState<boolean>(false);
  const [inviteeEmail, setInviteeEmail] = useState<string>('');
  const [collaborationRoles, setCollaborationRoles] = useState<
    ICollaborationRole[]
  >([]);
  const [projectCollaborations, setProjectCollaborations] = useState<
    Array<IProjectCollaborations>
  >([]);
  const classes = styles();

  // TODO: refactor collaborationRoles since it's on useProject
  const { data: collaborationData, refetch: getAndSetProjectCollaborations } =
    useQuery(
      [`getProjectCollaborations`, projectId],
      () => {
        return CollaborationsApi.getCollaborations({
          projectId,
          direction: 'all',
        });
      },
      {
        enabled: !!projectId,
      }
    );

  useEffect(() => {
    setProjectCollaborations(collaborationData);
  }, [collaborationData]);

  const setCopyLinkFromEvent = async () => {
    try {
      const url = await CollaborationsApi.generateSharingLink({
        projectId,
      });

      return url.link;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const { mutate: shareProject } = useMutation(
    () =>
      CollaborationsApi.createCollaboration({
        projectId,
        inviteeEmail,
        collaborationRoleId: permission,
      }),
    {
      onSuccess: collaboration => {
        getAndSetProjectCollaborations(collaboration);
        trackShareProject({ projectId, inviteeEmail });
      },
      onError: (e: any) => {
        // @ts-ignore
        setProjectError(
          `${e?.response?.data?.message} error occurred.` ||
            'Something went wrong.'
        );
      },
    }
  );

  const { mutate: updateProjectCollab } = useMutation(
    (data: IUpdateProjectCollabVariables) =>
      CollaborationsApi.updateCollaboration(data.collaborationId, {
        collaborationRoleId: data.collaborationRoleId,
        status: data.status,
        resend: false,
      }),
    {
      onSuccess: () => {
        getAndSetProjectCollaborations();
      },
      onError: () => {},
    }
  );

  const handleCopyLink = async () => {
    const copyLink = await setCopyLinkFromEvent();
    navigator.clipboard.writeText(copyLink);

    handleTooltipOpen();
    trackShareProject({ projectId });
  };

  const onShareSubmit = (event: any): void => {
    let error = '';
    schema
      .isValid({
        inviteeEmail,
      })
      .then(valid => {
        if (!valid) {
          error += 'You must enter a valid email.';
        }
        if (permission === '') {
          error += 'You must select a role.';
        }
        if (error === '') {
          shareProject();
          setProjectError('');
          getAndSetProjectCollaborations();
          event.preventDefault();
        } else {
          setProjectError(error);
          event.preventDefault();
        }
      });
  };

  const handlePermissionChange = (event: SelectChangeEvent) => {
    setPermission(event.target.value);
  };

  const handleProjectCollabSubmit = (event: SelectChangeEvent) => {
    const splitFormValues = event.target.value.split('|');
    if (splitFormValues[1] === '-1') {
      updateProjectCollab({
        collaborationId: splitFormValues[0],
        status: 'BLOCKED',
      } as IUpdateProjectCollabVariables);
    } else {
      updateProjectCollab({
        collaborationId: splitFormValues[0],
        collaborationRoleId: splitFormValues[1],
      } as IUpdateProjectCollabVariables);
    }
  };

  const handleInviteeChange = (event: any) => {
    setInviteeEmail(event.target.value);
  };

  const {
    control,
    formState: { errors },
  } = useForm<ICollaboration>({
    mode: 'all',
    defaultValues: {
      projectId: '',
      inviteeEmail: '',
      collaborationRoleId: '',
    },
    resolver: yupResolver(schema),
  });

  const emailsToChekPermission = [
    'ryan.w.medlin@gmail.com',
    'ryan@speechlab.ai',
    'ryan+testemail@speechlab.ai',
    'melanie@speechlab.ai',
    'seamus@speechlab.ai',
    'ryan@speechlab.ai',
    'brooks@speechlab.ai',
    'danilo@speechlab.ai',
    'jay@speechlab.ai',
    'xinyi@speechlab.ai',
    'donishi@speechlab.ai',
    'ryanmedlin1374.100@gmail.com',
  ];

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      const roles = (await CollaborationsApi.getCollaborationRoles()) || [];
      const viewerRole =
        roles.find(role => role.name === 'viewer') ||
        ({} as ICollaborationRole);
      let collaborationRolesToShow = isOwner ? roles : [viewerRole];

      // Check if the user's email matches the list to grant additional permissions
      if (emailsToChekPermission.includes(currentUser.email)) {
        const editRole =
          roles.find(role => role.name === 'editor') ||
          ({} as ICollaborationRole);
        collaborationRolesToShow = [...collaborationRolesToShow, editRole];
      }

      setCollaborationRoles(collaborationRolesToShow);

      if (viewerRole) {
        setPermission(viewerRole.id);
      }
      if (projectId) {
        getAndSetProjectCollaborations();

        const project = await ProjectsApi.getProjectById(
          projectId as string,
          {} as ICopyUrlParams
        );
        const isOwner = project.owner.id === currentUser?.id;
        setIsOwner(isOwner);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id, projectId, currentUser, isOwner]);

  useEffect(() => {
    if (error === true) {
      showErrorToast(error);
    }
  }, [error, showErrorToast]);

  const handleTooltipClose = () => {
    setOpenTip(false);
  };

  const handleTooltipOpen = () => {
    setOpenTip(true);
  };

  return (
    <Dialog maxWidth={false} onClose={() => {}} open={open}>
      <ModalTitle isLargeSpacing>
        <HeaderWrapper onClick={() => {}}>
          <Typography
            variant='h4'
            color='#1B1B1F'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
            }}
          >
            Share &quot;
            <span
              style={{
                maxWidth: 330,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {projectName}
            </span>
            &quot;
          </Typography>
        </HeaderWrapper>
      </ModalTitle>
      <ModalContent>
        <Box>
          <form onSubmit={onShareSubmit}>
            <ShareForm>
              <Box display='flex' alignItems='center' width='100%' my={1}>
                <Box position='relative' width='100%'>
                  <Controller
                    name='inviteeEmail'
                    control={control}
                    render={({ field: { name } }): JSX.Element => (
                      <OutlinedInput
                        id='inviteeEmail'
                        placeholder='Enter your email'
                        required
                        onChange={handleInviteeChange}
                        value={inviteeEmail}
                        size='small'
                        name={name}
                        classes={classes}
                        fullWidth
                        color='secondary'
                        sx={{
                          pr: '90px',
                        }}
                      />
                    )}
                  />
                  {errors.inviteeEmail && (
                    <ErrorText>{errors.inviteeEmail.message}</ErrorText>
                  )}

                  <Permission>
                    <Select
                      required
                      disableUnderline
                      id='collaborationRoleId'
                      size='small'
                      variant='filled'
                      color='secondary'
                      value={permission}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            width: 160,
                          },
                        },
                      }}
                      options={collaborationRoles.map(role => ({
                        name: role.name,
                        value: role.id,
                      }))}
                      onChange={(e: any) => handlePermissionChange(e)}
                      label={(value?: string) =>
                        collaborationRoles.filter(role => role.id === value)[0]
                          ?.name || 'Viewer'
                      }
                    />
                  </Permission>
                </Box>
                <Button
                  variant='contained'
                  type='submit'
                  color='secondary'
                  // @ts-ignore
                  texttransform='capitalize'
                  sx={{ ml: 1, whiteSpace: 'nowrap' }}
                >
                  Send
                </Button>
              </Box>
              <Box>{projectError}</Box>
            </ShareForm>
          </form>
          {projectCollaborations
            ? projectCollaborations
                .filter(
                  item =>
                    (item.status === 'INVITED' || item.status === 'ACCEPTED') &&
                    item.inviteeEmail !== currentUser?.email
                )
                .map(({ id: idCollab, inviteeEmail: email, role }) => (
                  <Box
                    key={idCollab}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    gap={1.25}
                    my={1}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      p='8px 10px 8px 16px'
                    >
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '8px',
                          bgcolor: 'rgba(69, 70, 79, 1)',
                          mr: 1.25,
                        }}
                        alt={currentUser?.firstName}
                      >
                        <Typography variant='caption' color='#fff'>
                          {currentUser?.firstName.charAt(0) || ''}
                        </Typography>
                      </Avatar>
                      <Typography variant='body2' color='#000'>
                        {email} - {role.name} {/* Added role.name here */}
                      </Typography>
                    </Box>
                    {isOwner ? (
                      <Select
                        disableUnderline
                        sx={{ paddingLeft: '6px' }}
                        onChange={(e: any) => handleProjectCollabSubmit(e)}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              width: 160,
                            },
                          },
                        }}
                        variant='filled'
                        label={(value?: string) =>
                          collaborationRoles.filter(
                            role => `${idCollab}|${role.id}` === value
                          )[0]?.name || 'Viewer'
                        }
                        options={[
                          ...collaborationRoles.map(role => ({
                            name: role.name,
                            value: `${idCollab}|${role.id}`,
                          })),
                          {
                            name: 'Remove Access',
                            value: `${idCollab}|-1`,
                            hasDivider: true,
                          },
                        ]}
                        value={`${idCollab}|${role.id}`}
                      />
                    ) : (
                      ''
                    )}
                  </Box>
                ))
            : ''}
        </Box>
      </ModalContent>
      <ModalFooter justifycontent='space-between'>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Box>
            <Tooltip
              onClose={handleTooltipClose}
              open={openTip}
              title='The sharing URL has been copied to your clipboard.'
            >
              <Box />
            </Tooltip>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleCopyLink}
              startIcon={<LinkIcon sx={{ color: '#832AD0' }} />}
            >
              Copy Link
            </Button>
          </Box>
        </ClickAwayListener>

        <Button color='secondary' type='submit' onClick={handleClose}>
          Done
        </Button>
      </ModalFooter>
    </Dialog>
  );
};

export const ShareForm = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const FormLabel = styled(InputLabel)({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#000000',
  marginBottom: '4px',
});

const Permission = styled(Box)({
  position: 'absolute',
  right: 0,
  top: '4px',
});
